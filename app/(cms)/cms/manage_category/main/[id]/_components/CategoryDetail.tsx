'use client';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  BackButton, DataBlock, Modal, ToggleSection, TopNavi
} from '@/app/(cms)/_components';
import { useGetCategoryById } from '@/src/hooks/query/categories/useGetCategoryById';
import { LoadingCircle } from '@/app/_components';
import { size } from '@/src/styles';
import { SmallButton } from '@/app/(cms)/_components/SmallButton';
import { useDeleteCategory } from '@/src/hooks/query';
import { queryKeys } from '@/src/data';

interface Props {
  id: string;
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${size.normal[2]};
`;

const Buttons = styled.div`
  display: flex;
  gap: ${size.normal[2]};
`;

export function CategoryDetail({ id, }: Props) {
  const [ isOpen, setIsOpen, ] = useState(false);
  const [ deleteMessage, setDeleteMessage, ] = useState('');

  const { category, loading, done, } = useGetCategoryById(id);

  const qc = useQueryClient();
  const router = useRouter();
  const deleteCategory = useDeleteCategory();

  const onClickDeleteConfirm = useCallback(
    () => {
      setIsOpen(true);
    },
    []
  );

  const onClickDeleteCancel = useCallback(
    () => {
      setIsOpen(false);
      setDeleteMessage('');
    },
    []
  );

  const onClickDelete = useCallback(
    () => {
      if (category?.resData.SubCategory.length > 0) {
        setDeleteMessage('실패: 하위 카테고리가 있습니다.');

        return;
      }

      deleteCategory.mutate(id, {
        onSuccess() {
          router.replace('/cms/manage_category');

          qc.invalidateQueries({
            queryKey: queryKeys.categories.getAll,
          });
        },
      });
    },
    [ id, router, qc, category, ]
  );

  return (
    <>
      <TopNavi route={[ '홈', 'CMS', '카테고리 관리', '상세정보', ]} />
      <BackButton>뒤로가기</BackButton>

      <ToggleSection title='카테고리 정보' defaultOpen disableToggle>
        {loading && <LoadingCircle />}
        {done && (
          <>
            <DataContainer>
              <DataBlock
                name='카테고리 이름'
                value={category.resData?.name}
              />
              <DataBlock
                name='순서'
                value={category.resData?.order.toString()}
              />
              <DataBlock
                name='하위카테고리 개수'
                value={category.resData?.SubCategory.length.toString()}
              />
            </DataContainer>

            <Buttons>
              <SmallButton
                $width={150}
                onClick={onClickDeleteConfirm}
              >
                카테고리 삭제
              </SmallButton>
            </Buttons>
          </>
        )}
      </ToggleSection>

      {isOpen && (
        <Modal
          onClickClose={onClickDeleteCancel}
          onClickConfirm={onClickDelete}
          confirmMessage='정말로 삭제하시겠습니까?'
          cancelMessage={deleteMessage}
          okLabel='삭제'
          cancelLabel='취소'
        />
      )}
    </>
  );
}
