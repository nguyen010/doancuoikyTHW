const Models = require('./Models');
const nodemailer = require('nodemailer'); // 1. Bổ sung thư viện gửi mail
const MyConstants = require('../utils/MyConstants'); // 2. Bổ sung file hằng số

const CustomerDAO = {
  // Lấy danh sách tất cả khách hàng
  async selectAll() {
    const query = {};
    const customers = await Models.Customer.find(query).exec();
    return customers;
  },

  // Lấy thông tin khách hàng theo ID
  async selectByID(_id) {
    const customer = await Models.Customer.findById(_id).exec();
    return customer;
  },

  async selectByUsernameOrEmail(username, email) {
    const query = {
      $or: [
        { username: username },
        { email: email }
      ]
    };
    return await Models.Customer.findOne(query);
  },

  async selectByUsernameAndPassword(username, password) {
    const query = {
      username: username,
      password: password
    };
    return await Models.Customer.findOne(query);
  },

  async insert(customer) {
    return await Models.Customer.create(customer);
  },

  async active(id, token, active) {
    const query = {
      _id: id,
      token: token
    };
    const newValues = {
      active: active
    };
    return await Models.Customer.findOneAndUpdate(query, newValues);
  },

  // Dùng cho Khách hàng cập nhật Profile
  async update(id, customer) {
    const result = await Models.Customer.findByIdAndUpdate(
      id,
      {
        username: customer.username,
        password: customer.password,
        name: customer.name,
        phone: customer.phone,
        email: customer.email
      },
      { new: true }
    );
    return result;
  },

  // Dùng cho Admin Active/Deactive
  async updateActive(_id, active) {
    const query = { _id: _id };
    const newvalues = { $set: { active: active } };
    const result = await Models.Customer.updateOne(query, newvalues);
    return result;
  },

  // 3. BỔ SUNG: Hàm gửi mail kích hoạt/thông báo cho khách hàng
  async sendMailActivate(id) {
    const customer = await Models.Customer.findById(id).exec();
    if (customer) {
      // Cấu hình server gửi mail (lấy từ MyConstants)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: MyConstants.EMAIL_USER,
          pass: MyConstants.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: MyConstants.EMAIL_USER,
        to: customer.email, // Email khách hàng lấy từ DB
        subject: 'Thông báo trạng thái tài khoản - Shopping Online',
        html: `
          <div style="font-family: sans-serif; color: black;">
            <h2 style="color: #2c3e50;">Xin chào ${customer.name},</h2>
            <p>Admin hệ thống vừa cập nhật trạng thái tài khoản của bạn.</p>
            <p>Trạng thái hiện tại: 
               <b style="color: ${customer.active === 1 ? 'green' : 'red'};">
                  ${customer.active === 1 ? 'ĐÃ KÍCH HOẠT' : 'ĐÃ TẠM KHÓA'}
               </b>
            </p>
            <p>Vui lòng đăng nhập vào website để kiểm tra thông tin chi tiết.</p>
            <br/>
            <p>Trân trọng,<br/><b>Ban Quản Trị</b></p>
          </div>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Đã gửi email đến: ' + customer.email };
      } catch (err) {
        console.error(err);
        return { success: false, message: 'Lỗi gửi mail: ' + err.message };
      }
    }
    return { success: false, message: 'Không tìm thấy khách hàng!' };
  }
};

module.exports = CustomerDAO;