import { styled, Container, Paper } from '@mui/material';

export const BudgetPageOutsideContainer = styled(Container)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  [theme.breakpoints.only('xl')]: {
    paddingTop: 140,
    paddingBottom: 140,
  },
  [theme.breakpoints.down('xl')]: {
    paddingTop: 140,
    paddingBottom: 140,
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: 116,
    paddingBottom: 116,
  },
}));

export const BudgetPageTopContainerContainer = styled(Container)(({ theme }) => ({
  width: '100%',
  height: 55,
  display: 'flex',
  justifyContent: 'space-between',
  gap: 1,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 55 * 3,
  },
}));

export const CustomPaper = styled(Paper)(({ theme }) => ({
  width: '33%',
  height: '100%',
  alignSelf: 'flex-end',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderRadius: 0,
  background: theme.palette.secondary.light,
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
