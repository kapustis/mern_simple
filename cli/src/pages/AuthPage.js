import React, {useState, useContext, useEffect} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();
  const message = useMessage();
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    const data = await request('/api/auth/register', 'POST', {...form});
    message(data.message);
  }

  const loginHandler = async () => {
      const data = await request('/api/auth/login', 'POST', {...form})
      message(data.message);
      auth.login(data.token, data.userId);
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи Ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  autoComplete="off"
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  onChange={changeHandler}
                  value={form.email}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                  value={form.password}
                />
                <label htmlFor="password">Пароль</label>
              </div>
              <button className="btn yellow darken-4" style={{marginRight: 10}}
                      disabled={loading}
                      onClick={loginHandler}
              >
                Войти
              </button>
              <button className="btn grey lighten-1 black-text"
                      disabled={loading}
                      onClick={registerHandler}
              >
                Регистрация
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
