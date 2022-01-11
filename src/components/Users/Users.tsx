import { useState } from 'react';
import { User } from 'redux/reducers/types';
import UsersTable from 'components/UsersTable';
import UserForm from 'components/UserForm';
import UserEdit from 'components/UserEdit';
import { StyledContent, StyledLayout } from './styles';

export default function Users(): JSX.Element {
  const [searchData, setSearchData] = useState<User[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <StyledLayout>
      <StyledContent>
        {!edit && (
          <>
            <UserForm setSearchData={setSearchData} />
            <UsersTable
              edit={edit}
              setEdit={setEdit}
              setUser={setUser}
              searchData={searchData}
              setSearchData={setSearchData}
            />
          </>
        )}

        {edit && <UserEdit user={user} setEdit={setEdit} />}
      </StyledContent>
    </StyledLayout>
  );
}
