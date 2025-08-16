import { Alert, Slide, Snackbar as SnakbarMUI } from '@mui/material';

export const Snackbar = ({ setSnackbar, snackbar }) => {
    return (
        <SnakbarMUI
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            TransitionComponent={Slide}
            onClose={() => {
                setSnackbar(null);
            }}
            autoHideDuration={snackbar.duration || 3000}
            ClickAwayListenerProps={{ onClickAway: () => null }}
        >
            <Alert
                sx={{
                    zIndex: 10,
                    borderRadius: '20px',
                    height: '40px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    marginBottom: '4px',
                    alignItems: 'center',
                    '& .MuiAlert-action': { padding: '0px', marginLeft: '5px' },
                    '& .MuiAlert-standardInfo': { backgroundColor: 'red' },
                }}
                {...snackbar}
                onClose={() => {
                    setSnackbar(null);
                }}
                action={snackbar.hideclosebutton ? <></> : null}
            />
        </SnakbarMUI>
    );
};
