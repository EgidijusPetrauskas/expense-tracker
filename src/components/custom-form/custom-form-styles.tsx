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
  '& .MuiSelect-select': { color: theme.palette.primary.light },
  '& .MuiSvgIcon-root.MuiSelect-icon': { color: theme.palette.primary.main },
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
}));

export default StyledTextField;
