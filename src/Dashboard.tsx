import { Box, Button, Center, Flex, Grid, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./constants";
import { checkIsAdmin, isLoggedIn, logout } from "./utils";

function Dashboard() {

    const navigator = useNavigate()
    const [images, setImages] = useState<{
        user_id: string,
        output_image_url: string,
        input_image_url: string
    }[]>([])

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        async function check() {
            setIsLoading(true)
            if (!await isLoggedIn()) {
                navigator("/login")
            }
            setIsLoading(false)
        }
        async function getDashboard() {
            let url = baseUrl + "/image/"
            setIsLoading(true)
            if (!await checkIsAdmin()) {
                let user_id = localStorage.getItem("userId")
                url += user_id
            }
            const response = await axios.get(url, {
                headers: {
                    Authorization: localStorage.getItem("jwtToken")
                }
            })
            setIsLoading(false)
            const resImages: {
                user_id: string,
                output_image_url: string,
                input_image_url: string
            }[] = response.data.data.images
            console.log(response.data)
            if (resImages) {
                setImages(resImages)
            }
        }
        async function main() {
            await check()
            await getDashboard()
        }
        main()
    }, [])

    if (isLoading) {
        return <>Loading...</>
    }

    return (<>
        <Box>
            {isLoading}
            <Center pt={"1rem"} gap={"1rem"}>
                <Button onClick={() => { logout(); navigator("/login") }}>Logout</Button>
                <Button onClick={() => { navigator("/") }}>Home</Button>
            </Center>
            {images.map((image, index) => (
                <Center key={index}>
                    <Grid>
                        {"User Id: " + image.user_id}
                        <Flex>
                            <Box>
                                <Text>Input image:</Text>
                                <Image borderRadius={"1rem"} height={"20vw"} width={"20vw"} loading={"lazy"} src={image.input_image_url} />
                            </Box>
                            <Box>
                                <Text>Output image:</Text>
                                <Image borderRadius={"1rem"} height={"20vw"} width={"20vw"} loading={"lazy"} src={image.output_image_url} />
                            </Box>
                        </Flex>
                    </Grid>
                </Center>
            ))}
        </Box>
    </>

    );
}

export default Dashboard;
