# SSQS Deployment Notes

This project is ready to be deployed to the server that hosts `ssqs.site`.

Because this is a public cloud server, the quickest route is:

1. Upload the release package to the server
2. Extract it into `/var/www/ssqs/current`
3. Run the install script once
4. Let visitors open `http://ssqs.site`

## 1. Assumptions

- Ubuntu or another Debian-like Linux distribution
- SSH access is available on port `22`
- The app will run behind `nginx`
- The website will be served from the domain `ssqs.site`

## 2. Install system packages

```bash
sudo apt update
sudo apt install -y nginx curl git
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

## 3. Upload or clone the project

Choose one of the following:

### Option A: upload the local project

```bash
sudo mkdir -p /var/www/ssqs
sudo chown -R $USER:$USER /var/www/ssqs
cd /var/www/ssqs
mkdir -p current
```

Then upload the project files into:

```bash
/var/www/ssqs/current
```

If you are working from this Windows machine, you can first generate a compact upload package:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\package-release.ps1
```

That command creates a zip file under:

```text
release\
```

### Option B: clone from git

```bash
sudo mkdir -p /var/www/ssqs
sudo chown -R $USER:$USER /var/www/ssqs
git clone <your-repository-url> /var/www/ssqs/current
cd /var/www/ssqs/current
```

## 4. Install dependencies and build

```bash
cd /var/www/ssqs/current
npm ci
npm run build
```

The Next.js build is configured with `output: "standalone"`, so the runtime entry will be:

```bash
/var/www/ssqs/current/.next/standalone/server.js
```

For a standalone deployment, the `public` directory and `.next/static` must also be copied into `.next/standalone`. The bundled install and update scripts already do this automatically.

The SSQS service listens on:

```text
127.0.0.1:3100
```

This port is internal to the server and does not need to be opened to the public internet.

If the code has already been uploaded to `/var/www/ssqs/current`, you can also use the bundled installer:

```bash
chmod +x deploy/install-server.sh deploy/update-site.sh
./deploy/install-server.sh
```

## 5. Install the systemd service

```bash
sudo cp /var/www/ssqs/current/deploy/ssqs.service /etc/systemd/system/ssqs.service
sudo systemctl daemon-reload
sudo systemctl enable ssqs
sudo systemctl start ssqs
sudo systemctl status ssqs
```

Useful commands:

```bash
sudo journalctl -u ssqs -n 100 --no-pager
sudo systemctl restart ssqs
```

## 6. Install the nginx config

```bash
sudo cp /var/www/ssqs/current/deploy/ssqs.nginx.conf /etc/nginx/sites-available/ssqs
sudo ln -sf /etc/nginx/sites-available/ssqs /etc/nginx/sites-enabled/ssqs
sudo nginx -t
sudo systemctl reload nginx
```

If the default site is still enabled and conflicts with this one:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 7. Firewall

Make sure ports `80` and `22` are open in both:

- the server firewall
- the cloud provider security group

If you later add HTTPS, also open port `443`.

## 8. Test from a browser

Open:

```text
http://ssqs.site
```

## 9. Add a domain and HTTPS later

After the domain is pointed to the server:

1. Confirm `server_name ssqs.site www.ssqs.site;` in `deploy/ssqs.nginx.conf`
2. Reload nginx
3. Install HTTPS with Certbot

Typical Certbot flow:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.example
```
