"""
@author Abdoulaye NIANG
Date : 2024-01-07

Description 
Language name: Wolof
Wolof is a West African language, spoken mainly in Senegal, Gambia. 
There are also large communities in Mali, Guinea, South of Mauritania and Diaspora.
Wolof is the main language of Senegal.It is understood by more than 90% of the total 
population Senegal.

Wolof numeration system is decimal, with a pivot additive 5. So, there are special words 
for the numbers 1 to 5, but the numbers of 6 to 9 are formed from 5 + one unit (1, 2, 3, 4). 
From 10, the count starts again. The system is very regular,

source text : 
article doi: https://doi.org/10.1163/19589514-05102007
Title - Wolof numeration system: description and comparison with other Atlantic languages
"""

NUMERAL = {
        10**12: 'junniy milyaar',
        10**9: 'milyaar',
        10**6: 'milyoŋ',
        1000: 'junni',
        100: 'téeméer',
        30: 'fanweer',
        10: 'fukk',
        9: 'juróom-ñeent',
        8: 'juróom-ñett',
        7: 'juróom-ñaar',
        6: 'juróom-benn',
        5: 'juróom',
        4: 'ñeent',
        3: 'ñett',
        2: 'ñaar',
        1: 'benn',
        0: 'tus'
    }


def decompose_more_than_million(number:int, numeral:int)-> list:
	multiple, number = divmod(number, numeral)
	if multiple > 10:
		multiple = decompose(multiple)
	return (multiple, numeral) , number

"""
La difference entre les fonctions more_than_million et more_than_thousand
si par exemple pour un nombre est superieur a million 
1.002.100 il sera transcrit benn million ak ñaari junni ak téeméer
par contre si 2.100 il sera transcrit sans le "1" multiplicateur de mille 
il va donner junni ak téeméer.
"""
class lang:
    def __init__(self):
        pass

    def to_check(self, number):
        try:
            number = int(number)
            return number
        except Exception as e:
            print('Only int value')
    
    def to_cardinal( number):
        #self.__check(number)
        return cardinal(decompose(number))

    def to_currency(self, number):
        #to_check(number)
        return currency(self.to_check(number))


def decompose_more_than_thousand(number:int, numeral:int)-> list:
    multiple, number = divmod(number, numeral)
    if multiple > 10:
        multiple = decompose(multiple)
    return [numeral , number] if multiple == 1 else [(multiple, numeral), number]


def decompose_more_than_hundred(number:int, numeral:int)-> list:
    multiple, number = divmod(number, numeral)
    return [numeral , number] if multiple == 1 else [(multiple, numeral), number]


def decompose(number:int)-> list:
    result = []
    numeral = 10**12
    if number >= numeral:
    	v, number = decompose_more_than_million(number, numeral)
    	result.append(v)
    #number over billion or millard in french
    numeral = 10**9
    if number >= numeral:
    	v, number = decompose_more_than_million(number, numeral)
    	result.append(v)
    #number over million
    numeral = 10**6
    if number >= numeral:
    	v, number = decompose_more_than_million(number, numeral)
    	result.append(v)
    #number over thousand
    numeral = 10**3
    if number >= numeral:
        v, number = decompose_more_than_thousand(number, numeral)
        result.append(v)
    #number over hundred
    numeral = 10**2
    if number >= numeral:
        v, number = decompose_more_than_hundred(number, numeral)
        result.append(v)
    #number between <40 and >=30
    if (number< 40) and (number >= 30):
        multiple, number = divmod(number, 30)
        result.append(30)
    #number over ten
    numeral = 10
    if number >= numeral:
        v, number = decompose_more_than_hundred(number, numeral)
        result.append(v)
    #number under ten and not null
    if number > 0:
        result.append(number)
    return result


def cardinal(number_decompose:list)->str:
    result = ''
    len_decompose = len(number_decompose)
    for index, val in enumerate(number_decompose):
        if isinstance(val, tuple):
            if isinstance(val[0], list):
                i = ' ' if val[0][-1] == 1 else with_i(val)
                result += cardinal(val[0])+i+NUMERAL[val[1]]+with_ak(index, len_decompose)
            elif isinstance(val[0], int):
            	result += NUMERAL[val[0]]+with_i(val)+NUMERAL[val[1]]+with_ak(index, len_decompose)
        if isinstance(val, int):
        	result += NUMERAL[val]+with_ak(index, len_decompose)
    return result


def cardinal_2(number_decompose:list)->str:
    result = ''
    len_decompose = len(number_decompose)
    for index, val in enumerate(number_decompose):
        if isinstance(val, tuple):
            if isinstance(val[0], int):
                result += NUMERAL[val[0]]+with_i(val)+NUMERAL[val[1]]+with_ak(index, len_decompose)
            elif isinstance(val[0], list):
                for a, e in enumerate(val[0]):
                	i = ' ' if e == 1 else with_i(val)
                	result += cardinal_2([e])+i+NUMERAL[val[1]]+with_ak(a, len(val[0]))
                result +=with_ak(index, len_decompose)
        if isinstance(val, int):
        	result += NUMERAL[val]+with_ak(index, len_decompose)
    return result


def with_i(val:tuple)-> str:
    i = ' '
    if val[1] >= 100 :
        if val[0] != 1:
            i = 'i '
    return i


def with_ak(index:int, len_decompose:int)->str:
    ak = ''
    if index+1 < len_decompose:
        ak = ' ak '
    return ak


UNIT_MONEY = 'deureum'
def currency(number):
    result = ''
    if number >= 10**6:
        result, number = money_more_than_million(number)
    if number > 0:
        result += money_minus_million(number)
    return result


def with_fiftin(n):
	result = ''
	if n == 1:
		result += NUMERAL[n] 
	elif n > 1:
		result += NUMERAL[n]+'i'
	return result+' fiftin' if n>0 else ''


def money_more_than_million(number:int)->list:
    million = 10**6
    v1, less_million= divmod(number, million)
    more_than_million = v1 * million
    result = cardinal_2(decompose(more_than_million))
    if less_million > 0:
        result += ' ak '
    return [result, less_million]


def money_minus_million(number):
    deureum, fiftin = divmod(number, 5)
    result = ''
    if deureum == 1:
        result += UNIT_MONEY
    elif deureum > 0:
        unit = '' if (number % 25 == 0) or (deureum % 40 == 0) else 'i '+UNIT_MONEY
        result = cardinal_2(decompose(deureum))+unit
    result += ' ak ' if fiftin > 0 and deureum > 0 else ''
    result += with_fiftin(fiftin)
    return result

