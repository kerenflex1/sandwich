import SwiftUI

struct ChatView: View {
    @StateObject private var manager = WebSocketManager()
    @State private var currentMessage = ""
    @State private var username = "User"
    @State private var room = "lobby"
    @State private var showMiniApp = false

    var body: some View {
        VStack {
            List(manager.messages, id: \.self) { message in
                Text(message)
            }
            HStack {
                TextField("Message", text: $currentMessage)
                Button("Send") {
                    manager.send(room: room, user: username, text: currentMessage)
                    currentMessage = ""
                }
            }.padding()
            Button("MiniApp: Counter") { showMiniApp = true }
                .padding()
        }
        .sheet(isPresented: $showMiniApp) {
            MiniAppView(counter: $manager.counter) { value in
                manager.updateCounter(room: room, value: value)
            }
        }
        .onAppear {
            manager.connect(room: room)
        }
    }
}

struct ChatView_Previews: PreviewProvider {
    static var previews: some View {
        ChatView()
    }
}
