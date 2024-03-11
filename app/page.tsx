

import NavBar from "@/components/NavBar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Container, Flex , Heading, Text} from "@radix-ui/themes";



export default function Home() {
 
  return (
    <div>
      reminder
      <Container size={'1'}>
        <Flex direction="column">
          <Heading> Coding 
           <NavBar/>  
           {/* <ThemeSwitcher/> */}
          </Heading>
            <Text> Issues </Text>
        </Flex>
      </Container>
    </div>
  );
}
