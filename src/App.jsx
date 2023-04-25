import { Box, Card, Typography } from "@mui/material";
import StepFroms from "./components/StepForms";

export default function App() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card
        variant="outlined"
        sx={{
          padding: 8,
        }}
      >
        <Typography variant="h5" sx={{ pb: 4 }}>
          Validação com Hook Forms + Yp
        </Typography>

        <StepFroms />
      </Card>
    </Box>
  );
}
