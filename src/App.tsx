import { Button, Center, Grid, Image, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { baseUrl } from './constants';
import { isLoggedIn } from './utils';

function App() {
  const fileInput = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>()
  const [isLoading, setIsLoading] = useState(false)
  const navigator = useNavigate()
  const [imageUrl, setImageUrl] = useState<string>("")

  async function click() {
    if (!fileInput.current || !fileInput.current.files) return
    const file = fileInput.current.files[0]
    const formData = new FormData()
    formData.append("image", file, "image.jpg")
    setIsLoading(true)
    const response = await axios.post(baseUrl + "/image/remove_background", formData, {
      headers: {
        Authorization: localStorage.getItem("jwtToken")
      },
      responseType: "blob"
    })
    fileInput.current.value = ""
    setSelectedFile("")
    setIsLoading(false)
    const imageUrl = window.webkitURL.createObjectURL(new Blob([response.data]))
    setImageUrl(imageUrl)
  }

  useEffect(() => {
    async function check() {
      if (!await isLoggedIn()) {
        console.log("FF")
        navigator("/login")
      }
    }
    check()
  }, [])

  return (<>
    <Center h={"100vh"}>
      <Grid>
        <Input type={"file"} hidden ref={fileInput} onChange={() => {
          setSelectedFile((selectedFile) => fileInput.current?.value)
        }} accept={"image/png, image/jpg, image/jpeg"}></Input>
        <Button onClick={() => { fileInput.current?.click() }}>Upload File</Button>
        {selectedFile}
        <Button onClick={() => click()} isDisabled={isLoading || selectedFile === "" || !selectedFile}>{isLoading ? "Loading..." : "Remove background"}</Button>
        Output: <Image src={imageUrl} />
      </Grid>
    </Center>
  </>
  );
}

export default App;
