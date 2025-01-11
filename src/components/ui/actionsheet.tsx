import { Modal, Pressable, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { cn } from "~/utils/cn"

type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}
export function Actionsheet({ open, onClose, children }: Props) {
  return (
    <Modal visible={open} transparent className="flex-1" animationType="fade">
      <Pressable
        className="flex-1 bg-black opacity-60 blur-2xl"
        onPress={onClose}
      />
      <SafeAreaView
        edges={{ bottom: "additive" }}
        className={cn(
          "absolute bottom-0 z-50 mt-auto min-h-56 w-full overflow-hidden",
          "border border-neutral-dim border-b-0",
          "rounded-t-3xl bg-neutral-app p-4",
        )}
      >
        <View className="mx-auto mb-6 h-1 w-10 rounded-full bg-neutral-solid" />
        {children}
      </SafeAreaView>
    </Modal>
  )
}
