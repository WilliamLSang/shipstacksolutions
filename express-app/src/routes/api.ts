import { Router, Request, Response } from 'express'; 
import fs from 'fs'; 
import path from 'path'; 
 
const router = Router(); 
const contactsFile = path.join(__dirname, '..', '..', '..', 'data', 'contacts.json'); 

// Ensure data directory and file exist
const dataDir = path.dirname(contactsFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(contactsFile)) {
  fs.writeFileSync(contactsFile, JSON.stringify([], null, 2));
}

interface ContactFormData {
  name: string;
  email: string;
  volume?: string;
  channels?: string;
  message?: string;
  timestamp: string;
}
 
router.post('/contact', (req: Request, res: Response) => { 
  const { name, email, volume, channels, message } = req.body; 
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' }); 
  
  try {
    const contactsData = fs.readFileSync(contactsFile, 'utf-8');
    const contacts: ContactFormData[] = JSON.parse(contactsData);
    
    const newContact: ContactFormData = {
      name,
      email,
      volume: volume || '',
      channels: channels || '',
      message: message || '',
      timestamp: new Date().toISOString()
    };
    
    contacts.push(newContact);
    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
    
    res.status(201).json({ success: true, message: 'Thank you! We received your message and will be in touch soon.' });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ error: 'Failed to save contact information' });
  }
}); 

// GET /api/contacts - retrieve all contacts with basic auth
router.get('/contacts', (req: Request, res: Response) => {
  const { username, password } = req.query;
  
  // Check credentials from environment variables
  const validUsername = process.env.SHIPSTACK_USERNAME;
  const validPassword = process.env.PASSWORD;
  
    console.log('Auth attempt with username:', username);
    console.log('Auth attempt with password:', password);
    console.log('Valid credentials are username:', validUsername, 'and password:', validPassword);

  if (!username || !password) {
    return res.status(401).json({ error: 'Username and password required' });
  }
  
  if (username !== validUsername || password !== validPassword) {
    return res.status(403).json({ error: 'Invalid credentials' });
  }
  
  try {
    const contactsData = fs.readFileSync(contactsFile, 'utf-8');
    const contacts: ContactFormData[] = JSON.parse(contactsData);
    
    res.json({ 
      success: true, 
      count: contacts.length,
      contacts 
    });
  } catch (err) {
    console.error('Error reading contacts:', err);
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
});
 
export default router;
