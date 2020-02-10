import randomUser from '../api/randomUser'

export const generatePhoto = () => async dispatch => {
    const response = await randomUser.get('/api')
    dispatch({
        type: 'FETCH_PHOTO',
        payload: response.data.results[0].picture.medium
    })
    //console.log(response);
}