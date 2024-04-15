import { IconButton } from '@mui/material';
type props = {
  onClickFun: () => void,
  children: React.ReactNode;
}
export default function MuiIconButton({ children, onClickFun }: props) {
  <IconButton aria-label='toggle-darkaMode' size='medium' onClick={onClickFun}>
    {children}
  </IconButton>
}
