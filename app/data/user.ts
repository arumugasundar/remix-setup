import prisma from '~/db.server';

export const getUsers = async () => {
  try{
      const users = await prisma.user.findMany();
      return users;
  } catch(error) {
      console.log('error :', error?.toString());
      return null;
  }
}

export const getUsersById = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({ where : {id}});
    return user;
  } catch (error) {
    console.log('error :', error?.toString());
    return null;
  }
}

export const createUser = async (name: string, email: string) => {
  try {
    const user = await prisma.user.create({ data : { name, email, active: true }});
    return user;
  } catch (error) {
    console.log('error :', error?.toString());
    return null;
  }
}

export const updateUserByEmail = async (name: string, email: string) => {
  try {
    const user = await prisma.user.update({ where:{ email}, data:{ name, email, active: true}})
    return user;
  } catch (error) {
    console.log('error :', error?.toString());
    return null;
  }
}

export const deleteUserById = async (id: string) => {
  try {
    const deletedUser = await prisma.user.delete({ where:{ id }})
    console.log('delete user :', deletedUser);
    return deletedUser;
  } catch (error) {
    console.log('error :', error?.toString());
    return null;
  }
}