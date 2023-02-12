import { Box, Center, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./constants";
import { isAdmin, isLoggedIn } from "./utils";

function Dashboard() {

    const navigator = useNavigate()
    const [images, setImages] = useState<{
        user_id: string,
        output_image_url: string,
        input_image_url: string
    }[]>([])

    async function getDashboard() {
        const response = await axios.get(baseUrl + "/image/", {
            headers: {
                Authorization: localStorage.getItem("jwtToken")
            }
        })
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
    getDashboard()
    useEffect(() => {
        async function check() {
            if (!await isAdmin()) {
                console.log("FF")
                if (!await isLoggedIn()) {
                    navigator("/login")
                }
                else {
                    navigator("/")
                }
            }
        }
        check()
    }, [])
    return (<>
        <Box>
            {images.map((image) => (
                <Center>
                    <Box>
                        Input image:
                        <Image height={"20vw"} width={"20vw"} loading={"lazy"} src={image.input_image_url} />
                    </Box>
                    {"User Id: " + image.user_id}
                    <Box>
                        Input image:
                        <Image height={"20vw"} width={"20vw"} loading={"lazy"} src={image.output_image_url} />
                    </Box>
                </Center>
            ))}
        </Box>
    </>

    );
}

export default Dashboard;
