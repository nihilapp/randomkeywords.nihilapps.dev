'use client';

import React from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { color, size } from '@/src/styles';

interface Props {
  onClickClose: () => void;
  onClickConfirm: () => void;
  confirmMessage?: string;
  cancelMessage?: string;
  okLabel?: string;
  cancelLabel?: string;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  z-index: 2;
  background-color: ${color.white};
  border-radius: ${size.normal[1]};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: ${size.normal[2]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalCloseButton = styled.button`
  display: block;
  margin-left: auto;
  font-size: ${size.text.h4};
`;

const ModalMessage = styled.p`
  font-size: ${size.text.h6};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${size.normal[1]};

  & > span {
    color: ${color.red[500]};
    font-weight: 900;
  }
`;

const BottomButtons = styled.div`
  display: flex;
  gap: ${size.normal[2]};
`;

const ModalButton = styled.button`
  flex: 1;
  flex-shrink: 0;
  padding: ${size.normal[2]};
  background-color: ${color.black.base};
  color: ${color.white};
  border: 2px solid ${color.black.base};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${color.red[500]};
    border-color: ${color.red[500]};
  }
`;

const ModalCancelButton = styled.button`
  flex: 1;
  flex-shrink: 0;
  padding: ${size.normal[2]};
  border: 2px solid ${color.black.base};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${color.black.base};
    border-color: ${color.black.base};
    color: ${color.white};
  }
`;

export function Modal({
  onClickClose,
  onClickConfirm,
  confirmMessage,
  cancelMessage,
  okLabel = '확인',
  cancelLabel = '취소',
}: Props) {
  return (
    <>
      <ModalBackground onClick={onClickClose} />
      <ModalBody>
        <ModalCloseButton onClick={onClickClose}>
          <Icon icon='ic:round-close' />
        </ModalCloseButton>
        <ModalMessage>
          {confirmMessage}
          {cancelMessage && <span>{cancelMessage}</span>}
        </ModalMessage>
        <BottomButtons>
          <ModalButton
            onClick={onClickConfirm}
            disabled={!!cancelMessage}
          >
            {okLabel}
          </ModalButton>
          <ModalCancelButton onClick={onClickClose}>
            {cancelLabel}
          </ModalCancelButton>
        </BottomButtons>
      </ModalBody>
    </>
  );
}
