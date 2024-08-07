import React, {useState} from "react";
import { Container, TextField, Typography, Box, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
// import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import axios from "axios";

const Transcrite = () => {
    // a remplacer par l'adresse du reseau local ou public.
    const apiURL = "http://localhost:8800"
    const [number, setNumber] = useState('');
    const [outputSelected, setOutputSelected] = useState({
        cardinal: true,
        code : false,
        money: false,
    });
    const [translate, setTranslate] = useState({})
    const [isLoading, setIsLoading] = useState(false); 
    const [errorr, setErrorr] = useState('');

    const handleTranslate = async (value) => {
        setIsLoading(true);
        try {
            setTranslate('');
            setErrorr('')
            const response = await axios.get(`${apiURL}/get/strnumber/${value}`);
            setTranslate(response.data);
        } catch (error) {
            if (error.code && error.code === 'ERR_NETWORK'){
                setErrorr('Network Error');
            }
            console.error("There was an error fetching the data!", error.code);
        }
        setIsLoading(false); 
    }

    const handleNumberChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) { 
                setNumber(value);
                handleTranslate(value);
        }    
    }

    const handleCheckboxChange = (event) => {
        setOutputSelected({ ...outputSelected, [event.target.name]: event.target.checked });
    }

    return (
        <Container>
            <Typography padding={2} variant="h3" gutterBottom>Transcrite wolof Number</Typography>
            <Box mb={4}>
                <Typography variant="body1"  style={{ textAlign: 'justify' }} >
                    Wolof is a West African language, spoken mainly in Senegal, Gambia. 
                    There are also large communities in Mali, Guinea, South of Mauritania and Diaspora.
                    Wolof is the main language of Senegal. It is understood by more than 90% of the total 
                    population Senegal.

                    Wolof numeration system is decimal, with a pivot additive 5. So, there are special words 
                    for the numbers 1 to 5, but the numbers of 6 to 9 are formed from 5 + one unit (1, 2, 3, 4). 
                    From 10, the count starts again. The system is very regular.
                    
                </Typography>
                <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>
                    Source text <br/>
                    <a href="https://doi.org/10.1163/19589514-05102007" target="_blank" rel="noopener noreferrer">
                         Wolof numeration system: description and comparison with other Atlantic languages
                    </a>
                </Typography>
            </Box>
            <Box mb={4}>
                <TextField 
                    variant="outlined"
                    label='Valeur'
                    value={number}
                    onChange={handleNumberChange}
                    InputProps={{
                        style: { fontSize: '24px' },
                      }}
                      InputLabelProps={{
                        style: { fontSize: '24px' },
                      }}
                > </TextField>
            </Box>

            <Box  mb={2}>
                <FormControlLabel
                    control={<Checkbox 
                        checked={outputSelected.cardinal} 
                        onChange={handleCheckboxChange} name="cardinal" />
                    }
                    label="Cardinal"
                />
                { <FormControlLabel
                    control={<Checkbox 
                        checked={outputSelected.code} 
                        onChange={handleCheckboxChange} name="code" />
                    }
                    label="Code"
                /> }
                <FormControlLabel
                    control={
                        <Checkbox checked={outputSelected.money} 
                        onChange={handleCheckboxChange} name="money" />
                    }
                    label="Money"
                />
            </Box>

            <Box mb={2}>
                {number && errorr &&(
                    <Typography style={{ color: 'red' }}> 
                        Error {errorr} 
                    </Typography>
                )}
            </Box>

            <Box mb={2}>
                {number && outputSelected.code && (
                    <Typography variant="body1" style={{ textAlign: 'justify' }}>
                        Code Value : {translate.value_code} 
                    </Typography>
                    
                )}
                {number && outputSelected.code && (
                    <Typography variant="body1" style={{ textAlign: 'justify' }} >
                        Code : {translate.code} 
                    </Typography>
                    
                )}
            </Box>

            <Box  mb={2}> 
                {number && outputSelected.cardinal && (
                    <>
                    {isLoading ? ( 
                        <CircularProgress />
                    ) : (
                        <Typography variant="body1" style={{ textAlign: 'justify' }}>
                            Cardinal: {translate.cardinal}
                        </Typography>
                    )}
                    </>
                )}

                {number && outputSelected.cardinal && (
                    <Typography variant="body1"  style={{ textAlign: 'justify' }}>
                        Cardinal 2:  {translate.cardinal2} 
                    </Typography>
                )}
            </Box>

            <Box>
                {number && outputSelected.money && (
                    <>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Typography variant="body1"  style={{ textAlign: 'justify' }}>
                            Money CFA: {translate.money}
                        </Typography>
                    )}
                    </>
                )}
            </Box>
           
        </Container>

    )
}

export default Transcrite;
