import Foundation

class WebSocketManager: ObservableObject {
    private var socket: URLSessionWebSocketTask?
    @Published var messages: [String] = []
    @Published var counter: Int = 0

    func connect(room: String) {
        let url = URL(string: "ws://localhost:3000")!
        socket = URLSession.shared.webSocketTask(with: url)
        socket?.resume()

        listen()
        join(room: room)
    }

    private func join(room: String) {
        let data = try? JSONSerialization.data(withJSONObject: ["type": "join", "room": room])
        if let data {
            let message = URLSessionWebSocketTask.Message.data(data)
            socket?.send(message) { _ in }
        }
    }

    private func listen() {
        socket?.receive { [weak self] result in
            switch result {
            case .failure(let error):
                print("WebSocket error: \(error)")
            case .success(let message):
                self?.handle(message: message)
            }
            self?.listen()
        }
    }

    private func handle(message: URLSessionWebSocketTask.Message) {
        switch message {
        case .data(let data):
            guard let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else { return }
            if let text = json["text"] as? String, let user = json["user"] as? String {
                DispatchQueue.main.async {
                    self.messages.append("\(user): \(text)")
                }
            }
            if let value = json["value"] as? Int {
                DispatchQueue.main.async {
                    self.counter = value
                }
            }
        default:
            break
        }
    }

    func send(room: String, user: String, text: String) {
        let payload: [String: Any] = ["type": "message", "room": room, "user": user, "text": text]
        let data = try! JSONSerialization.data(withJSONObject: payload)
        socket?.send(.data(data)) { _ in }
    }

    func updateCounter(room: String, value: Int) {
        let payload: [String: Any] = ["type": "miniapp:counter", "room": room, "value": value]
        let data = try! JSONSerialization.data(withJSONObject: payload)
        socket?.send(.data(data)) { _ in }
    }
}
