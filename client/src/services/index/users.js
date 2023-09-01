import axios from 'axios';

// 성공적으로 API 응답이 도착하면 { data } 로부터 응답 데이터를 추출하여 반환

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post('/api/users/register', {
      name,
      email,
      password,
    });

    // API 응답 데이터 반환
    return data;
  } catch (error) {
    // API 응답에 메시지가 포함된 경우 해당 메시지로 에러 처리
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);

    // API 응답이 없거나 메시지가 없는 경우 일반적인 에러 메시지로 처리
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post('/api/users/login', {
      email,
      password,
    });

    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);

    throw new Error(error.message);
  }
};

export const getUserProfile = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get('/api/users/profile', config);

    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);

    throw new Error(error.message);
  }
};

export const updateProfile = async ({ token, userData }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      '/api/users/updateProfile',
      userData,
      config,
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);

    throw new Error(error.message);
  }
};
