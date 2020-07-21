import styled from "styled-components";

export const Container = styled.div`
  width: 85%;
  max-width: 750px;
  margin: 50px auto 100px;
  position: relative;
  .jokes {
    &-item {
      font-size: 1.1rem;
      margin-bottom: 20px;
      padding: 15px 0;
      border-bottom: 2px solid #f1f1f1;
      &:last-child {
        border: none;
      }
    }
  }
  .logout-btn {
    position: fixed;
    bottom: 50px;
    right: 1rem;
    @media (min-width: 750px) {
      right: 2rem;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #2196f3;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
    i {
      color: #fff;
      font-size: 1.7rem;
    }
    &:hover {
      background-color: #1565c0;
    }
  }
`;

export const StyledForm = styled.form`
  width: 83%;
  max-width: 400px;
  margin: 150px auto;
  padding: 20px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.09);
  border-radius: 4px;
  h1 {
    text-align: center;
    font-size: 2rem;
    margin: 20px 0;
  }
  .form-footer {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }
  .btn {
    padding: 15px;
    background-color: #2196f3;
    text-transform: uppercase;
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #1565c0;
    }
  }
  a {
    margin-top: 25px;
    text-align: center;
    color: #2196f3;
    padding: 15px;
    &:hover {
      background-color: #e3f2fd;
    }
  }
`;