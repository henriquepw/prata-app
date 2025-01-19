import { Link } from "expo-router"
import { PlusIcon } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Heading } from "~/components/ui/heading"

export default function RecurrentListPage() {
  return (
    <Background asChild>
      <SafeAreaView className="gap-6 p-4">
        <Box className="h-10 flex-row items-center justify-between gap-2">
          <Heading size="2xl">Recorrências</Heading>
          <Link asChild href="/recurrents/register">
            <Button size="sm" className="size-10">
              <ButtonIcon as={PlusIcon} />
            </Button>
          </Link>
        </Box>
        <Card>
          <Heading>TODO</Heading>
        </Card>
      </SafeAreaView>
    </Background>
  )
}
