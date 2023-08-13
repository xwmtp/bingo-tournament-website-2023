import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Colors } from "../../GlobalStyle";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

export const ErrorText: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <ErrorStyled>{children}</ErrorStyled>;
};

// todo remove spaces / periods / commas at end of 'text'
export const UserErrorText: React.FC<{ text: string }> = ({ text }) => {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  const navigate = useNavigate();

  return (
    <ErrorText>
      {`${text}. Please try to `}
      <LinkStyled
        onClick={() => {
          logoutMutation.mutate();
          navigate("/");
        }}
      >
        log out
      </LinkStyled>
      {" and in again, and try again. If it still fails, ping a TO in the Discord."}
    </ErrorText>
  );
};

const ErrorStyled = styled.p`
  color: ${Colors.lightSecondary};
  margin: 0.3rem 0;
`;

const LinkStyled = styled.a`
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;
