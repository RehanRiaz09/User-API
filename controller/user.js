import messageUtil from '../utilities/message.js';
import userService from '../services/userService.js';
import {
  bcryptHash,
  comparePassword,
  hashPassword,
} from '../utilities/password.js';
import jwtHelper from '../utilities/jwt.js';
import Response from '../utilities/Response.js';
import mongoose from 'mongoose';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

class UserController {
  SignUp = async (req, res) => {
    try {
      let user = await userService.findUser({ email: req.body.email });
      if (user) {
        return Response.ExistallReady(res, messageUtil.ALL_READY_EXIST);
      }
      user = await userService.createUser({
        ...req.body,
        password: await bcryptHash(req.body.password),
      });
      user.password = await bcryptHash(req.body.password);
      user.save();
      const token = await jwtHelper.issue({ _id: user._id });

      return Response.success(res, messageUtil.USER_CREATED, user, token);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  Login = async (req, res) => {
    try {
      let user = await userService.findUser({ email: req.body.email });
      if (!user) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      const isMatch = await comparePassword(req.body.password, user.password);
      if (!isMatch) {
        return Response.authorizationError(res, messageUtil.INCORRECT_PASSWORD);
      }
      const token = await jwtHelper.issue({ _id: user._id });
      return Response.success(res, messageUtil.LOGIN_SUCCESS, user, token);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  getAllUser = async (req, res) => {
    try {
      let users;
      users = await userService.findAll(req.query);
      if (!users) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      return Response.success(res, messageUtil.OK, users);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  getOnlyId = async (req, res) => {
    try {
      const id = req.params.userId;
      let user = await userService.findUserId(id, req.userId);
      if (!user) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      } else {
        return Response.success(res, messageUtil.OK, user);
      }
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  // userUpdate = async (req, res) => {
  //   try {
  //     const id = req.params.userId;
  //     let user = await userService.findUser({ id: req.userId });
  //     if (!user) {
  //       return Response.notfound(res, messageUtil.NOT_FOUND);
  //     }
  //     user = await userService.updateUser(req.query, req.body);
  //     if (!user) {
  //       return Response.notfound(res, messageUtil.NOT_FOUND);
  //     } else {
  //       return Response.success(res, messageUtil.OK, user);
  //     }
  //   } catch (error) {
  //     return Response.serverError(res, error);
  //   }
  // };

  userUpdate = async (req, res) => {
    try {
      const userId = req.params.userId;

      //  Ensure userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return Response.badRequest(res, 'Invalid User ID');
      }

      //  Find user using `_id`, not `id`
      let user = await userService.findUser({
        _id: new mongoose.Types.ObjectId(userId),
      });

      if (!user) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }

      //  Pass the correct ID for updating the user
      user = await userService.updateUser({ _id: userId }, req.body);

      if (!user) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }

      return Response.success(res, messageUtil.OK, user);
    } catch (error) {
      console.error('Error updating user:', error);
      return Response.serverError(res, error);
    }
  };
  userDelete = async (req, res) => {
    try {
      const adminId = req.userId; // The user making the request (assumed to be admin)
      const userId = req.params.userId; // The user to be deleted

      // ✅ Check if admin exists & has admin role
      // const admin = await userService.findUser({ _id: adminId });

      // if (!admin || admin.role !== 'admin') {
      //   return Response.authorizationError(res, messageUtil.UNAUTHORIZED);
      // }

      // ✅ Check if the user to delete exists
      const user = await userService.findUser({ _id: userId });

      if (!user) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }

      // ✅ Delete the user
      const deletedUser = await userService.deleteUser({ _id: userId });

      if (!deletedUser) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }

      return Response.success(res, messageUtil.OK, deletedUser);
    } catch (error) {
      console.error('Error deleting user:', error);
      return Response.serverError(res, error);
    }
  };

  // Forget password
  forgetPassword = async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return Response.badRequest(res, messageUtil.EMAIL_REQUIRED);
      }

      const checkUser = await User.findOne({ email });

      if (!checkUser) {
        return Response.notfound(res, messageUtil.REGISTER_AGAIN);
        // return res
        //   .status(400)
        //   .send({ message: 'User not found please register' });
      }

      const token = jwt.sign({ email }, process.env.SECRETKEY, {
        expiresIn: '1h',
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const receiver = {
        from: 'wishpostings@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: `Click on this link to generate your new password ${process.env.CLIENT_URL}/reset-password/${token}`,
      };

      await transporter.sendMail(receiver);
      return Response.success(
        res,
        'Password reset link send successfully on your gmail account'
      );
      // return res.status(200).send({
      //   message: 'Password reset link send successfully on your gmail account',
      // });
    } catch (error) {
      return Response.serverError(res, error);
      //return res.status(500).send({ message: 'Something went wrong' });
    }
  };
  // Reset Password
  resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      if (!password) {
        return Response.badRequest(res, messageUtil.PASSWORD_REQUIRED);
        // return res.status(400).send({ message: 'Please provide password' });
      }

      const decode = jwt.verify(token, process.env.SECRETKEY);

      const user = await User.findOne({ email: decode.email });

      const newhashPassword = await hashPassword(password);

      user.password = newhashPassword;
      await user.save();
      return Response.success(res, 'Password reset successfully');
      // return res.status(200).send({ message: 'Password reset successfully' });
    } catch (error) {
      return Response.serverError(res, error);
      // return res.status(500).send({ message: 'Something went wrong' });
    }
  };
  changePassword = async (req, res) => {
    try {
      const { email, currentPassword, newPassword } = req.body;

      if (!email || !currentPassword || !newPassword) {
        return res
          .status(400)
          .send({ message: 'Please provide all required fields' });
      }

      const checkUser = await User.findOne({ email });

      if (!checkUser) {
        return res
          .status(400)
          .send({ message: 'User not found please register' });
      }

      const isMatchPassword = await comparePassword(
        currentPassword,
        checkUser.password
      );

      if (!isMatchPassword) {
        return res
          .status(400)
          .send({ message: 'Current password does not match' });
      }

      const newHashPassword = await hashPassword(newPassword);

      await User.updateOne({ email }, { password: newHashPassword });

      return res.status(200).send({ message: 'Password change successfully' });
    } catch (error) {
      return res.status(500).send({ message: 'Something went wrong' });
    }
  };
}
export default new UserController();
