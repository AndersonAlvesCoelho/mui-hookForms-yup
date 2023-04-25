//IMPORTS
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// COMPONENTS
import { Box, Button, Grid, TextField } from "@mui/material";

//HELPERS
import { maskPhoneNumber } from "../../helpers/mask";

// VALIDAÇÃO DO CAMOR DO FORMS
const rgxPhoneNumber = /[0-9]{2}[ ][0-9]{5}[-][0-9]{4}/;
const validateSchema = Yup.object().shape({
  fullName: Yup.string().required("Nome completo é obrigatório."),
  phone: Yup.string()
    .required("Telefone é obrigatório.")
    .matches(rgxPhoneNumber, {
      message: "Informe um telefone válido!",
      excludeEmptyString: false,
    }),
  email: Yup.string()
    .email("Informe um email válido!")
    .required("E-mail é obrigatório."),
  emailConfirmation: Yup.string().required(
    "Confirmação de e-mail é obrigatório."
  ).oneOf([Yup.ref("email"), ""], "Os emails devem corresponder."),
});

export default function StepPersonalInformation() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validateSchema),
  });

  const [valuesForm, setValuesForm] = useState([]);

  function onSubmit(values) {
    setValuesForm(values);
  }

  useEffect(() => {
    setValue("phone", maskPhoneNumber(watch("phone")) );
  }, [watch("phone")]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            {...register("fullName")}
            fullWidth
            label="Nome completo"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            error={!!errors.fullName}
            helperText={errors.phone?.message}
            {...register("phone")}
            fullWidth
            label="Telefone"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            error={!!errors.fullName}
            helperText={errors.email?.message}
            {...register("email")}
            fullWidth
            label="E-mail"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            error={!!errors.fullName}
            helperText={errors.emailConfirmation?.message}
            {...register("emailConfirmation")}
            fullWidth
            label="Confrimação de E-mail"
          />
        </Grid>

        <Grid item xs={6}>
          <Button sx={{ mt: 3 }} type="submit" variant="contained">
            Confirmar
          </Button>
        </Grid>

        <Grid item xs={6}>
          <code>{JSON.stringify(valuesForm, null, 2)}</code>
        </Grid>

      </Grid>
    </Box>
  );
}
