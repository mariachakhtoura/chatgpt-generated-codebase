import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const LIST_USERS = gql`
  query ListUsers($pagination: PaginationInput!, $roles: [Insurance_UserRoles], $statuses: [Insurance_UserStatuses]) {
    listUsers(pagination: $pagination, roles: $roles, statuses: $statuses) {
      items {
        system_User_Id
        system_User_firstName
        system_User_lastName
        system_User_email
        system_User_mobile
        system_User_roles
        system_User_status
      }
      totalCount
    }
  }
`;

const UserList = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { loading, error, data } = useQuery(LIST_USERS, {
    variables: {
      pagination: { page, pageSize },
      roles: roleFilter ? [roleFilter] : undefined,
      statuses: statusFilter ? [statusFilter] : undefined,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredUsers = data?.listUsers.items.filter(user =>
    user.system_User_firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.system_User_lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.system_User_email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      
      <div className="flex space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="UNDERWRITER">Underwriter</SelectItem>
            <SelectItem value="ACCOUNTANT">Accountant</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.system_User_Id}>
              <TableCell>{user.system_User_firstName}</TableCell>
              <TableCell>{user.system_User_lastName}</TableCell>
              <TableCell>{user.system_User_email}</TableCell>
              <TableCell>{user.system_User_mobile}</TableCell>
              <TableCell>{user.system_User_roles.join(', ')}</TableCell>
              <TableCell>{user.system_User_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;