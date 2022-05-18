import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': { color: theme.palette.primary.main },
  '& .MuiOutlinedInput-root': {
    '& > fieldset': { borderColor: theme.palette.primary.light },
  },
  '& .MuiOutlinedInput-root:hover': {
    '& > fieldset': { borderColor: theme.palette.primary.main },
  },
  '& .MuiInputLabel-root.Mui-error': {
    color: theme.palette.secondary.main,
  },
  '& .MuiOutlinedInput-root.Mui-error': {
    '& > fieldset': { borderColor: theme.palette.secondary.dark },
  },
}));

export default StyledTextField;
