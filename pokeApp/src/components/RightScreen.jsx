import { Box } from "@mui/material"
import { ScreenRightDesciptions } from "../views/ScreenRightDesciptions.jsx"


export const RightScreen = () => {

  return (
    <Box sx={{
      height: { xs: "50%", md: "45%" }, // Increased height on desktop too
      width: "90%",
      backgroundColor: "#084035",
      border: "2px solid #000",
      minHeight: "150px"
    }}>

      <ScreenRightDesciptions />
    
    </Box>
  )
}


