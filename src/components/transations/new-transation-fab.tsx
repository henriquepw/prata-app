import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, ButtonIcon } from "../ui/button"
import { AddIcon } from "../ui/icons"
export function NewTransationFab() {
  return (
    <SafeAreaView className="absolute right-6 bottom-0">
      <Link href="/transations/register" asChild>
        <Button className="h-12 w-12 grow items-center justify-center rounded-full bg-primary-solid shadow-sm">
          <ButtonIcon icon={AddIcon} className="text-2xl text-primary-normal" />
        </Button>
      </Link>
    </SafeAreaView>
  )
}
