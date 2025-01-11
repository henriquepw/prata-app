import { AddIcon } from "../ui/icons"
import { Link } from "expo-router"
import { Button, ButtonIcon } from "../ui/button"
import { SafeAreaView } from "react-native-safe-area-context"

export function NewTransationFab() {
  return (
    <SafeAreaView className="absolute right-6 bottom-0">
      <Link href="/transations/register" asChild>
        <Button className="h-12 w-12 grow items-center justify-center rounded-full">
          <ButtonIcon icon={AddIcon} />
        </Button>
      </Link>
    </SafeAreaView>
  )
}
