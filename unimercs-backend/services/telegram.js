const https = require('https');

class TelegramNotifier {
  constructor() {
    this.token   = process.env.TELEGRAM_BOT_TOKEN;
    this.chatId  = process.env.TELEGRAM_CHAT_ID;
    this.enabled = !!(this.token && this.chatId);
  }

  sendMessage(message) {
    return new Promise((resolve, reject) => {
      if (!this.enabled) {
        console.warn('[Telegram] Variables TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID no configuradas. Notificacion omitida.');
        return resolve({ ok: false, skipped: true });
      }

      const body = JSON.stringify({
        chat_id:    this.chatId,
        text:       message,
        parse_mode: 'Markdown'
      });

      const options = {
        hostname: 'api.telegram.org',
        path:     `/bot${this.token}/sendMessage`,
        method:   'POST',
        headers:  {
          'Content-Type':   'application/json',
          'Content-Length': Buffer.byteLength(body)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.ok) {
              console.log(`[Telegram] Mensaje enviado correctamente. message_id: ${parsed.result.message_id}`);
              resolve(parsed);
            } else {
              console.error('[Telegram] Error de API:', parsed.description);
              reject(new Error(parsed.description));
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', (err) => {
        console.error('[Telegram] Error de red:', err.message);
        reject(err);
      });

      req.write(body);
      req.end();
    });
  }


  async notifyNewPost(post) {
    const message =
      `*Nueva publicación en UniMercs*\n\n` +
      `*${post.title}*\n` +
      `Precio: $${Number(post.price).toLocaleString('es-CO')}\n` +
      `Categoría: ${post.category}\n` +
      `Vendedor: ${post.sellerName}\n` +
      `${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}`;

    return this.sendMessage(message);
  }


  async notifyNewUser(user) {
    const message =
      `*Nuevo usuario registrado en UniMercs*\n\n` +
      `Nombre: ${user.name}\n` +
      `Email: ${user.email}\n` +
      `${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}`;

    return this.sendMessage(message);
  }
}

module.exports = new TelegramNotifier();
