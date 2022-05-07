import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': { color: theme.palette.primary.main },
  '& .MuiOutlinedInput-root': {
    '& > fieldset': { borderColor: theme.palette.primary.light },
  },
}));

export default StyledTextField;
