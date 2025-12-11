// LoginStyled.js
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

export const FormContainer = styled.form`
  min-height: 380px;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 7px grey;
  background-color: #ffffff;
`

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

export const Logo = styled.img`
  width: 170px;
  height: 40px;
`

export const Label = styled.label`
  font-size: 14px;
  color: #475569;
  font-weight: 600;
`

export const Input = styled.input`
  width: 90%;
  height: 30px;
  margin: 8px 0 15px 0;
  padding: 10px;
  border: 1px solid #94a3b8;
  border-radius: 5px;
  outline: none;
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 15px;
`

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`

export const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 10px;
`

export const ErrorMsg = styled.p`
  color: red;
  margin: 0;
  font-size: 14px;
`
