import axios from 'axios';

const getQuiz = async (queryParams) => {
/*  Función que permite obtener una trivia/quiz que se genera en la API según las configuraciones
    de: categoría, cantidad de preguntas, dificultad y tipo (establecidas como query params).*/

    try {
        let response = await axios.get(queryParams, {method: 'GET'});

        /* Se obtuvo exitosamente la respuesta desde la API */
        return response.data;

    } catch (error) {
        if (error.response) {
            /* Error recibido desde la API */
            let response = error.response;
            return response.data;
        }

        if (error.request) {
            /* La solicitud fue realizada, pero no se 
            ha obtenido una respuesta desde la API */
            return {
                message: 'Someone doesn\'t want to share the quiz... Please try again later.'
            };
        }

        /* Error interno */
        console.log(error);
        return {
            message: 'Houston we have a problem! Please try again later.'
        };
    }

}

export {
    getQuiz
}