import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Snackbar,
    Alert,
    CircularProgress,
    InputAdornment,
    Fade,
    Slide,
    type SelectChangeEvent
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
    Person,
    Phone,
    Send,
    CheckCircle
} from '@mui/icons-material';

import Logo from "../assets/logo-kichik-akademiya.png"

// Logo ranglari
const NAVY = '#14356C';
const NAVY_DARK = '#0E2650';
const NAVY_LIGHT = '#2A5AA8';
const GREEN = '#3BA86E';
const GREEN_DARK = '#2E8757';
const GREEN_LIGHT = '#5CC48C';
const YELLOW = '#FFC900';

// "Kichik Akademiya" logosiga moslangan yorug' tema
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: NAVY,
            light: NAVY_LIGHT,
            dark: NAVY_DARK,
        },
        secondary: {
            main: GREEN,
            light: GREEN_LIGHT,
            dark: GREEN_DARK,
        },
        warning: {
            main: YELLOW,
        },
        background: {
            default: '#F4F7FC',
            paper: '#FFFFFF',
        },
        text: {
            primary: NAVY,
            secondary: '#5B6B87',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 800,
            fontSize: '2rem',
        },
        h6: {
            fontWeight: 600,
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: '#FFFFFF',
                    border: '1px solid rgba(20, 53, 108, 0.08)',
                    borderRadius: '24px',
                    boxShadow: '0 24px 60px rgba(20, 53, 108, 0.12)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '14px',
                        background: '#F7F9FD',
                        '& fieldset': {
                            borderColor: 'rgba(20, 53, 108, 0.15)',
                        },
                        '&:hover fieldset': {
                            borderColor: GREEN,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: NAVY,
                            borderWidth: '2px',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#5B6B87',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: NAVY,
                    },
                    '& .MuiInputBase-input': {
                        color: NAVY,
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '14px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    padding: '12px 32px',
                    color: '#FFFFFF',
                    background: `linear-gradient(90deg, ${NAVY} 0%, ${NAVY_LIGHT} 55%, ${GREEN} 100%)`,
                    boxShadow: '0 10px 28px rgba(20, 53, 108, 0.28)',
                    '&:hover': {
                        background: `linear-gradient(90deg, ${NAVY_DARK} 0%, ${NAVY} 55%, ${GREEN_DARK} 100%)`,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 14px 34px rgba(20, 53, 108, 0.34)',
                    },
                    '&.Mui-disabled': {
                        background: 'rgba(20, 53, 108, 0.25)',
                        color: '#FFFFFF',
                    },
                    transition: 'all 0.3s ease',
                },
            },
        },
    },
});


interface FormData {
    name: string;
    district: string;
    class: string;
    phoneNumber: string;
}

const SchoolRegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        district: '',
        class: '',
        phoneNumber: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const tumanlar = [
        'Pop tumani',
        'Boshqa'
    ];

    const age = [
        "3-yosh",
        "4-yosh",
        "5-yosh",
        "6-yosh",
    ]

    const handleInputChange = (field: keyof FormData) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            setError('Ismingizni kiriting');
            return false;
        }
        if (!formData.district) {
            setError('Tumanni tanlang');
            return false;
        }
        if (!formData.class) {
            setError('Yoshni tanlang');
            return false;
        }
        if (!formData.phoneNumber.trim()) {
            setError('Telefon raqamini kiriting');
            return false;
        }
        if (!/^\+998\s?\d{2}\s?\d{3}-?\d{4}$/.test(formData.phoneNumber)) {
            setError('Telefon raqami noto\'g\'ri formatda');
            return false;
        }
        return true;
    };

    const sendToTelegram = async () => {
        const message = `🎓 YANGI RO'YXATDAN O'TISH

👤 Ism: ${formData.name}
🏘️ Tuman: ${formData.district}
📚 Yoshi: ${formData.class}
📞 Telefon: ${formData.phoneNumber}

📅 Vaqt: ${new Date().toLocaleString('uz-UZ')}`;

        const response = await fetch('https://api.telegram.org/bot8611785686:AAEqYbdlYS1aU9DkcZGNj6U0-PN3uQJFCWo/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: '-1004384208873',
                text: message,
                parse_mode: 'HTML'
            }),
        });

        if (!response.ok) {
            throw new Error('Telegram ga yuborishda xatolik');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setOpenSnackbar(true);
            return;
        }

        setLoading(true);
        setError('');

        try {
            await sendToTelegram();
            setSuccess(true);
            setFormData({
                name: '',
                district: '',
                class: '',
                phoneNumber: '',
            });
            setTimeout(() => setSuccess(false), 3000);
        } catch {
            setError('Ariza yuborishda xatolik yuz berdi. Qaytadan urinib ko\'ring.');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #F4F7FC 0%, #E9F1FB 45%, #EAF7F0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-140px',
                        left: '-120px',
                        width: '360px',
                        height: '360px',
                        borderRadius: '50%',
                        background: 'rgba(20, 53, 108, 0.08)',
                        filter: 'blur(10px)',
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-160px',
                        right: '-120px',
                        width: '380px',
                        height: '380px',
                        borderRadius: '50%',
                        background: 'rgba(59, 168, 110, 0.12)',
                        filter: 'blur(10px)',
                    },
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{ position: 'relative', zIndex: 1, px: { xs: 0, sm: 3 } }}
                >
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Paper
                            elevation={24}
                            sx={{
                                padding: { xs: 2.5, sm: 4 },
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '6px',
                                    background: `linear-gradient(90deg, ${NAVY} 0%, ${GREEN} 60%, ${YELLOW} 100%)`,
                                },
                            }}
                        >
                            <Box textAlign="center" mb={4}>
                                <Box
                                    sx={{
                                        width: { xs: 120, sm: 148 },
                                        height: { xs: 120, sm: 148 },
                                        margin: '0 auto 16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#FFFFFF',
                                        border: '1px solid rgba(20, 53, 108, 0.10)',
                                        borderRadius: '28px',
                                        boxShadow: '0 12px 32px rgba(20, 53, 108, 0.12)',
                                    }}
                                >
                                    <img
                                        style={{ width: '78%', height: '78%', objectFit: 'contain' }}
                                        src={Logo}
                                        alt="Kichik Akademiya"
                                    />
                                </Box>

                                <Typography
                                    variant="h4"
                                    gutterBottom
                                    sx={{
                                        color: NAVY,
                                        letterSpacing: '-0.5px',
                                        fontSize: { xs: '1.6rem', sm: '2rem' },
                                    }}
                                >
                                    Kichik Akademiya
                                </Typography>

                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        color: GREEN,
                                        fontWeight: 700,
                                        fontSize: { xs: '1.05rem', sm: '1.25rem' },
                                    }}
                                >
                                    Xususiy bog'chasi
                                </Typography>

                                <Box
                                    sx={{
                                        width: '64px',
                                        height: '4px',
                                        borderRadius: '4px',
                                        background: `linear-gradient(90deg, ${NAVY}, ${GREEN}, ${YELLOW})`,
                                        margin: '12px auto 20px',
                                    }}
                                />

                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{ color: NAVY, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}
                                >
                                    Qabulga ro'yxatdan o'ting
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Ma'lumotlaringizni yozib qoldiring, siz bilan tezda bog'lanamiz,
                                    bog'chamiz haqida yana ham batafsil ma'lumot beramiz
                                </Typography>
                            </Box>

                            {success ? (
                                <Fade in={success}>
                                    <Box textAlign="center" py={4}>
                                        <CheckCircle sx={{ fontSize: 80, color: GREEN, mb: 2 }} />
                                        <Typography variant="h5" sx={{ color: GREEN, fontWeight: 700 }} gutterBottom>
                                            Muvaffaqiyatli yuborildi!
                                        </Typography>
                                        <Typography color="text.secondary">
                                            Tez orada siz bilan bog'lanamiz
                                        </Typography>
                                    </Box>
                                </Fade>
                            ) : (
                                <Box component="form" onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        label="Ismingiz"
                                        value={formData.name}
                                        onChange={handleInputChange('name')}
                                        margin="normal"
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person sx={{ color: NAVY }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            mb: 2,
                                            '& input:-webkit-autofill': {
                                                WebkitBoxShadow: '0 0 0 1000px #F7F9FD inset',
                                                WebkitTextFillColor: NAVY,
                                                transition: 'background-color 5000s ease-in-out 0s',
                                            },
                                        }}
                                    />

                                    <FormControl fullWidth margin="normal" required sx={{ mb: 2 }}>
                                        <InputLabel>Tumanni tanlang</InputLabel>
                                        <Select
                                            value={formData.district}
                                            onChange={handleInputChange('district')}
                                            label="Tumanni tanlang"
                                            sx={{
                                                borderRadius: '14px',
                                                background: '#F7F9FD',
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(20, 53, 108, 0.15)',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: GREEN,
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: NAVY,
                                                    borderWidth: '2px',
                                                },
                                            }}
                                        >
                                            {tumanlar.map((tuman) => (
                                                <MenuItem key={tuman} value={tuman}>
                                                    {tuman}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth margin="normal" required sx={{ mb: 2 }}>
                                        <InputLabel>Yosh tanlang</InputLabel>
                                        <Select
                                            value={formData.class}
                                            onChange={handleInputChange('class')}
                                            label="Yosh tanlang"
                                            sx={{
                                                borderRadius: '14px',
                                                background: '#F7F9FD',
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(20, 53, 108, 0.15)',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: GREEN,
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: NAVY,
                                                    borderWidth: '2px',
                                                },
                                            }}
                                        >
                                            {age.map((item) => (
                                                <MenuItem key={item} value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        fullWidth
                                        label="Telefon raqami"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange('phoneNumber')}
                                        margin="normal"
                                        required
                                        placeholder="+998 99 999-9999"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Phone sx={{ color: NAVY }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            mb: 3,
                                            '& input:-webkit-autofill': {
                                                WebkitBoxShadow: '0 0 0 1000px #F7F9FD inset',
                                                WebkitTextFillColor: NAVY,
                                                transition: 'background-color 5000s ease-in-out 0s',
                                            },
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        disabled={loading}
                                        startIcon={loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <Send />}
                                        sx={{
                                            py: 1.5,
                                            fontSize: { xs: '1.05rem', sm: '1.2rem' },
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {loading ? 'Yuborilmoqda...' : 'Ariza topshirish'}
                                    </Button>
                                </Box>
                            )}
                        </Paper>
                    </Slide>
                </Container>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={() => setOpenSnackbar(false)}
                        severity="error"
                        variant="filled"
                        sx={{ borderRadius: '12px' }}
                    >
                        {error}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
};

export default SchoolRegistrationForm;
