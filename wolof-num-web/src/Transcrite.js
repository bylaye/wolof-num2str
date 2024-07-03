import React, {useState} from "react";
import { Container, TextField, Typography, Box, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
// import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import axios from "axios";

const Transcrite = () => {
    const apiURL = "http://localhost:8800"
    const [number, setNumber] = useState('');
    const [outputSelected, setOutputSelected] = useState({
        cardinal: true,
        ordinal : false,
        money: false,
    });
    const [translate, setTranslate] = useState({})
    const [isLoading, setIsLoading] = useState(false); 

    const handleTranslate = async (value) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${apiURL}/get/strnumber/${value}`);
            setTranslate(response.data);
        } catch (error) {
            console.error("There was an error fetching the data!");
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
                > </TextField>
            </Box>

            <Box  mb={4}>
                <FormControlLabel
                    control={<Checkbox 
                        checked={outputSelected.cardinal} 
                        onChange={handleCheckboxChange} name="cardinal" />
                    }
                    label="Cardinal"
                />
                {/* <FormControlLabel
                    control={<Checkbox 
                        checked={outputSelected.ordinal} 
                        onChange={handleCheckboxChange} name="ordinal" />
                    }
                    label="Ordinal"
                /> */}
                <FormControlLabel
                    control={
                        <Checkbox checked={outputSelected.money} 
                        onChange={handleCheckboxChange} name="money" />
                    }
                    label="Money"
                />
            </Box>

            <Box  mb={2}>
                {/* {number && outputSelected.ordinal && (
                    <Typography variant="body1">Exemple Ordinal: Ordinal Number</Typography>
                )} */}
                
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
