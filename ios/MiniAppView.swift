import SwiftUI

struct MiniAppView: View {
    @Binding var counter: Int
    var onUpdate: (Int) -> Void

    var body: some View {
        VStack(spacing: 20) {
            Text("Counter: \(counter)")
                .font(.largeTitle)
            HStack {
                Button("-") {
                    counter -= 1
                    onUpdate(counter)
                }
                Button("+") {
                    counter += 1
                    onUpdate(counter)
                }
            }
        }
        .padding()
    }
}

struct MiniAppView_Previews: PreviewProvider {
    static var previews: some View {
        MiniAppView(counter: .constant(0)) { _ in }
    }
}
