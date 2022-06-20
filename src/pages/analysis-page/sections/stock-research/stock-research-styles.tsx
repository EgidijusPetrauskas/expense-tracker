import { styled, Alert } from '@mui/material';

const SuccesfullAlert = styled(Alert)(({ theme }) => ({
  height: '100%',
  alignItems: 'center',
  position: 'absolute',
  right: 0,
  fontSize: 15,
  letterSpacing: 0.7,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 35,
    position: 'static',
    paddingTop: 16,
    paddingBottom: 16,
  },
}));

export default SuccesfullAlert;
