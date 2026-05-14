const mockRequest = {
  write: jest.fn(),
  end:   jest.fn(),
  on:    jest.fn()
};

jest.mock('https', () => ({
  request: jest.fn((options, callback) => {
    const mockResponse = {
      on: jest.fn((event, handler) => {
        if (event === 'data') handler(JSON.stringify({ ok: true, result: { message_id: 42 } }));
        if (event === 'end')  handler();
      })
    };
    if (callback) callback(mockResponse);
    return mockRequest;
  })
}));

describe('TelegramNotifier - Servicio de notificaciones', () => {

  let TelegramNotifier;

  beforeEach(() => {
    jest.resetModules();
    mockRequest.write.mockClear();
    mockRequest.end.mockClear();
  });


  describe('Con variables de entorno configuradas', () => {
    beforeEach(() => {
      process.env.TELEGRAM_BOT_TOKEN = 'test-token-123';
      process.env.TELEGRAM_CHAT_ID   = '987654321';
      jest.resetModules();
      TelegramNotifier = require('./telegram');
    });

    afterEach(() => {
      delete process.env.TELEGRAM_BOT_TOKEN;
      delete process.env.TELEGRAM_CHAT_ID;
    });

    test('CP-TELEGRAM-01: sendMessage debe llamar a https.request', async () => {
      const https = require('https');
      await TelegramNotifier.sendMessage('Hola test');
      expect(https.request).toHaveBeenCalled();
    });

    test('CP-TELEGRAM-02: sendMessage debe escribir el body con chat_id y text', async () => {
      await TelegramNotifier.sendMessage('Mensaje de prueba');
      expect(mockRequest.write).toHaveBeenCalled();
      const bodyStr = mockRequest.write.mock.calls[0][0];
      const body    = JSON.parse(bodyStr);
      expect(body.chat_id).toBe('987654321');
      expect(body.text).toBe('Mensaje de prueba');
      expect(body.parse_mode).toBe('Markdown');
    });

    test('CP-TELEGRAM-03: notifyNewPost debe incluir titulo y precio del post', async () => {
      const post = { title: 'iPhone 15', price: 5000000, category: 'electronics', sellerName: 'Juan' };
      await TelegramNotifier.notifyNewPost(post);
      const bodyStr = mockRequest.write.mock.calls[0][0];
      const body    = JSON.parse(bodyStr);
      expect(body.text).toContain('iPhone 15');
      expect(body.text).toContain('5.000.000');
    });

    test('CP-TELEGRAM-04: notifyNewUser debe incluir nombre y email', async () => {
      const user = { name: 'German Rodriguez', email: 'german@javeriana.edu.co' };
      await TelegramNotifier.notifyNewUser(user);
      const bodyStr = mockRequest.write.mock.calls[0][0];
      const body    = JSON.parse(bodyStr);
      expect(body.text).toContain('German Rodriguez');
      expect(body.text).toContain('german@javeriana.edu.co');
    });

    test('CP-TELEGRAM-05: sendMessage retorna objeto con ok:true en exito', async () => {
      const result = await TelegramNotifier.sendMessage('Test');
      expect(result.ok).toBe(true);
      expect(result.result.message_id).toBe(42);
    });
  });


  describe('Sin variables de entorno configuradas', () => {
    beforeEach(() => {
      delete process.env.TELEGRAM_BOT_TOKEN;
      delete process.env.TELEGRAM_CHAT_ID;
      jest.resetModules();
      TelegramNotifier = require('./telegram');
    });

    test('CP-TELEGRAM-06: sendMessage debe retornar skipped:true sin credenciales', async () => {
      const result = await TelegramNotifier.sendMessage('Test');
      expect(result.ok).toBe(false);
      expect(result.skipped).toBe(true);
    });

    test('CP-TELEGRAM-07: notifyNewPost no debe lanzar error sin credenciales', async () => {
      const post = { title: 'Test', price: 1000, category: 'books', sellerName: 'Test' };
      await expect(TelegramNotifier.notifyNewPost(post)).resolves.not.toThrow();
    });

    test('CP-TELEGRAM-08: notifyNewUser no debe lanzar error sin credenciales', async () => {
      const user = { name: 'Test', email: 'test@test.com' };
      await expect(TelegramNotifier.notifyNewUser(user)).resolves.not.toThrow();
    });
  });
});
