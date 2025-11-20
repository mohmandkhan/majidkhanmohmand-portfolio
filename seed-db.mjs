import { getDb } from './server/db.ts';
import {
  heroSection,
  aboutSection,
  projects,
  experiences,
  skills,
  certifications,
  education,
  blogs,
  companies,
  channels,
  referrals,
  socialLinks,
  hireOptions,
} from './drizzle/schema.ts';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    
    const db = await getDb();
    if (!db) {
      throw new Error('Failed to connect to database');
    }

    // Clear existing data
    console.log('Clearing existing data...');
    await db.delete(heroSection);
    await db.delete(aboutSection);
    await db.delete(projects);
    await db.delete(experiences);
    await db.delete(skills);
    await db.delete(certifications);
    await db.delete(education);
    await db.delete(blogs);
    await db.delete(companies);
    await db.delete(channels);
    await db.delete(referrals);
    await db.delete(socialLinks);
    await db.delete(hireOptions);

    // Seed Hero Section
    console.log('Seeding hero section...');
    await db.insert(heroSection).values({
      title: 'Majid Khan Mohmand',
      subtitle: 'Full Stack Developer • AI Enthusiast • Content Creator • Entrepreneur',
      description: 'Programming, Tech, Careers, Learning, Entertainment and Entrepreneurship',
    });

    // Seed About Section
    console.log('Seeding about section...');
    await db.insert(aboutSection).values({
      title: 'About Me',
      content: 'I am a passionate Full Stack Developer and Cloud Architect with expertise in building scalable web applications, cloud infrastructure, and AI automation solutions. Currently pursuing a Master\'s in Data Science and Business Informatics at Università di Pisa. I love creating innovative solutions that solve real-world problems and sharing knowledge through content creation and entrepreneurship.',
    });

    // Seed Projects
    console.log('Seeding projects...');
    const projectsData = [
      { title: 'Personal - Portfolio', url: 'https://majidkhanmohmand.com/', category: 'Personal', order: 1 },
      { title: 'Project - QURB Services', url: 'https://app.qurbservices.com/', category: 'Project', order: 2 },
      { title: 'Project - Academy', url: 'https://academy.avrygroup.com/', category: 'Project', order: 3 },
      { title: 'Project - MKM Host', url: 'https://mkmhost.com/', category: 'Project', order: 4 },
      { title: 'Project - WhatsApp API', url: 'https://whatsapp.thetechabc.com/', category: 'Project', order: 5 },
      { title: 'Project - Digital Marketplace', url: 'https://mkmmarket.com/', category: 'Project', order: 6 },
      { title: 'Project - Dallham AI', url: 'https://dallham.com/', category: 'Project', order: 7 },
      { title: 'Project - My Daily Tools', url: 'https://mydailytools.com/', category: 'Project', order: 8 },
      { title: 'PearlTrips', url: 'https://pearltrips.com/', category: 'Project', order: 9 },
    ];
    await db.insert(projects).values(projectsData);

    // Seed Experiences
    console.log('Seeding experiences...');
    const experiencesData = [
      {
        title: 'Senior Full Stack Web Developer',
        company: 'STORESWIKI – USA – REMOTE',
        logoUrl: '/logos/storeswiki-logo.png',
        period: '04-2024 - Present',
        description: 'Leading full-stack development with modern web technologies and cloud infrastructure',
        technologies: JSON.stringify(['JavaScript', 'React', 'Node.js', 'AWS', 'Docker', 'MySQL']),
        order: 1,
      },
      {
        title: 'Senior Full Stack Web Developer',
        company: 'ALLER MEDIA AB – SWEDEN – REMOTE',
        logoUrl: '/logos/aller-media-logo.png',
        period: '11-2023 - 04-2024',
        description: 'Developed and maintained scalable web applications for media company',
        technologies: JSON.stringify(['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker']),
        order: 2,
      },
      {
        title: 'AWS Cloud Developer',
        company: 'QURB SERVICES – USA – REMOTE',
        logoUrl: '/logos/qurb-logo.png',
        period: '08-2023 - 11-2023',
        description: 'Architected and deployed cloud infrastructure on AWS',
        technologies: JSON.stringify(['AWS', 'Lambda', 'S3', 'RDS', 'CloudFormation']),
        order: 3,
      },
      {
        title: 'Tech-Lead',
        company: 'QURB SERVICES – USA – REMOTE',
        logoUrl: '/logos/qurb-logo.png',
        period: '05-2023 - 08-2023',
        description: 'Led development team and managed technical architecture',
        technologies: JSON.stringify(['React', 'Node.js', 'MongoDB', 'AWS']),
        order: 4,
      },
      {
        title: 'Full Stack Developer',
        company: 'QURB SERVICES – USA – REMOTE',
        logoUrl: '/logos/qurb-logo.png',
        period: '01-2023 - 05-2023',
        description: 'Developed full-stack features for service platform',
        technologies: JSON.stringify(['React', 'Node.js', 'MongoDB', 'AWS']),
        order: 5,
      },
      {
        title: 'Full Stack Web Developer (USA)',
        company: 'CODE ENGINEERS – USA – REMOTE',
        logoUrl: '/logos/code-engineers-logo.png',
        period: '2021 - 2023',
        description: 'Built web applications and maintained client projects',
        technologies: JSON.stringify(['JavaScript', 'React', 'Node.js', 'PostgreSQL']),
        order: 6,
      },
    ];
    await db.insert(experiences).values(experiencesData);

    // Seed Skills
    console.log('Seeding skills...');
    const skillsData = [
      { category: 'Languages & Frameworks', name: 'JavaScript', icon: '⚡', proficiencyLevel: 'Expert', order: 1 },
      { category: 'Languages & Frameworks', name: 'TypeScript', icon: '📘', proficiencyLevel: 'Expert', order: 2 },
      { category: 'Languages & Frameworks', name: 'React', icon: '⚛️', proficiencyLevel: 'Expert', order: 3 },
      { category: 'Languages & Frameworks', name: 'Node.js', icon: '🟢', proficiencyLevel: 'Expert', order: 4 },
      { category: 'Languages & Frameworks', name: 'Python', icon: '🐍', proficiencyLevel: 'Advanced', order: 5 },
      { category: 'UI/UX', name: 'Tailwind CSS', icon: '🎨', proficiencyLevel: 'Expert', order: 6 },
      { category: 'UI/UX', name: 'Material UI', icon: '🎯', proficiencyLevel: 'Advanced', order: 7 },
      { category: 'UI/UX', name: 'Figma', icon: '🖌️', proficiencyLevel: 'Intermediate', order: 8 },
      { category: 'Backend Technologies', name: 'Express.js', icon: '🚀', proficiencyLevel: 'Expert', order: 9 },
      { category: 'Backend Technologies', name: 'FastAPI', icon: '⚙️', proficiencyLevel: 'Advanced', order: 10 },
      { category: 'Backend Technologies', name: 'Django', icon: '🔧', proficiencyLevel: 'Advanced', order: 11 },
      { category: 'Backend Technologies', name: 'GraphQL', icon: '📊', proficiencyLevel: 'Advanced', order: 12 },
      { category: 'Cloud & DevOps', name: 'AWS', icon: '☁️', proficiencyLevel: 'Expert', order: 13 },
      { category: 'Cloud & DevOps', name: 'Docker', icon: '🐳', proficiencyLevel: 'Expert', order: 14 },
      { category: 'Cloud & DevOps', name: 'Kubernetes', icon: '⚓', proficiencyLevel: 'Advanced', order: 15 },
      { category: 'Cloud & DevOps', name: 'CI/CD', icon: '🔄', proficiencyLevel: 'Advanced', order: 16 },
      { category: 'Databases', name: 'MongoDB', icon: '🍃', proficiencyLevel: 'Expert', order: 17 },
      { category: 'Databases', name: 'PostgreSQL', icon: '🗄️', proficiencyLevel: 'Expert', order: 18 },
      { category: 'Databases', name: 'MySQL', icon: '🔵', proficiencyLevel: 'Advanced', order: 19 },
      { category: 'SDLC Methodologies', name: 'Agile', icon: '📋', proficiencyLevel: 'Expert', order: 20 },
    ];
    await db.insert(skills).values(skillsData);

    // Seed Certifications
    console.log('Seeding certifications...');
    const certificationsData = [
      { title: 'Microsoft Azure Fundamentals Certification', issuer: 'Microsoft', credentialId: 'AZ-900', order: 1 },
      { title: 'IBM Data Science Professional Certificate', issuer: 'IBM', credentialId: 'IBM-DS', order: 2 },
      { title: 'Databricks Certified Associate Developer', issuer: 'Databricks', credentialId: 'DBC-AD', order: 3 },
      { title: 'AWS Solutions Architect Associate', issuer: 'Amazon', credentialId: 'AWS-SAA', order: 4 },
    ];
    await db.insert(certifications).values(certificationsData);

    // Seed Education
    console.log('Seeding education...');
    const educationData = [
      {
        degree: 'Master\'s in Data Science and Business Informatics',
        institution: 'Università di Pisa',
        fieldOfStudy: 'Data Science',
        startYear: 2025,
        gpa: null,
        order: 1,
      },
      {
        degree: 'Master\'s in Software Engineering',
        institution: 'Virtual University of Pakistan',
        fieldOfStudy: 'Software Engineering',
        startYear: 2021,
        gpa: '3.8',
        order: 2,
      },
      {
        degree: 'Bachelor\'s in Computer Science',
        institution: 'University of Peshawar',
        fieldOfStudy: 'Computer Science',
        startYear: 2019,
        gpa: '3.7',
        order: 3,
      },
    ];
    await db.insert(education).values(educationData);

    // Seed Blogs
    console.log('Seeding blogs...');
    const blogsData = [
      { title: 'The Tech Blog', url: 'https://blog.example.com/tech', description: 'Latest tech trends and tutorials', order: 1 },
      { title: 'Dev Insights', url: 'https://blog.example.com/dev', description: 'Development best practices', order: 2 },
      { title: 'Cloud Chronicles', url: 'https://blog.example.com/cloud', description: 'Cloud architecture and DevOps', order: 3 },
      { title: 'AI Adventures', url: 'https://blog.example.com/ai', description: 'Artificial Intelligence insights', order: 4 },
    ];
    await db.insert(blogs).values(blogsData);

    // Seed Companies
    console.log('Seeding companies...');
    const companiesData = [
      {
        name: 'StoresWiki',
        url: 'https://storeswiki.com',
        logoUrl: '/logos/storeswiki-logo.png',
        role: 'Co-Founder',
        description: 'E-commerce platform and marketplace',
        order: 1,
      },
      {
        name: 'Code Engineers',
        url: 'https://codeengineers.com',
        logoUrl: '/logos/code-engineers-logo.png',
        role: 'Founder & CEO',
        description: 'Software development and consulting',
        order: 2,
      },
    ];
    await db.insert(companies).values(companiesData);

    // Seed Channels
    console.log('Seeding channels...');
    const channelsData = [
      { title: 'Market Maverick (MKM)', url: 'https://whatsapp.com/channel/0029VayosDMLNSa9rgibaX0H', category: 'Business & Entrepreneurship', flagEmoji: '🇺🇸', order: 1 },
      { title: 'Millionaires Mindset', url: 'https://whatsapp.com/channel/0029VaosSLIFSAtCtIXmbC0E', category: 'Business & Entrepreneurship', flagEmoji: '🇺🇸', order: 2 },
      { title: 'Storeswiki LLC', url: 'https://whatsapp.com/channel/0029Vaytxl759PwQEA7MEk3z', category: 'Business & Entrepreneurship', flagEmoji: '🇺🇸', order: 3 },
      { title: 'Batman Pakistan', url: 'https://whatsapp.com/channel/0029VatthhYBqbr4Sx3Erf1L', category: 'Pakistan-Based Channels', flagEmoji: '🇵🇰', order: 4 },
      { title: 'MonsterTools', url: 'https://whatsapp.com/channel/0029VayIHbs7oQhUO9IsHM00', category: 'Pakistan-Based Channels', flagEmoji: '🇵🇰', order: 5 },
      { title: 'Secret Pakistan', url: 'https://whatsapp.com/channel/0029Vauzcbo90x2zsSZUyK1M', category: 'Pakistan-Based Channels', flagEmoji: '🇵🇰', order: 6 },
      { title: 'DALLHAMAI Pakistan', url: 'https://whatsapp.com/channel/0029VauFrN7DJ6HAJwAla73z', category: 'Pakistan-Based Channels', flagEmoji: '🇵🇰', order: 7 },
      { title: 'TechABC WhatsApp API', url: 'https://whatsapp.com/channel/0029Vatxc4KL2ATy0f8QGB1E', category: 'Technology & Tools', flagEmoji: '💻', order: 8 },
      { title: 'MEGA COURSE Channel', url: 'https://whatsapp.com/channel/0029VauBiyv3bbV4mnJ7d63S', category: 'Technology & Tools', flagEmoji: '📚', order: 9 },
      { title: 'ClickGrow: SocialMedia Automation', url: 'https://whatsapp.com/channel/0029VayD0iQGE56cPNzrY90r', category: 'Technology & Tools', flagEmoji: '🔧', order: 10 },
      { title: 'MKM Enterprise', url: 'https://whatsapp.com/channel/0029VayzX3HDeON89j5UZ10Z', category: 'Business & Entrepreneurship', flagEmoji: '🇺🇸', order: 11 },
      { title: 'Game Lovers', url: 'https://whatsapp.com/channel/0029VazdNxrLikg13bzZiO3n', category: 'Interest Groups', flagEmoji: '🎮', order: 12 },
      { title: 'Technology Lovers', url: 'https://whatsapp.com/channel/0029VazQM1jJENy3drf3s83D', category: 'Interest Groups', flagEmoji: '💻', order: 13 },
      { title: 'Cricket Lovers', url: 'https://whatsapp.com/channel/0029VazTgFYBA1f0SOpg1y0N', category: 'Interest Groups', flagEmoji: '🏏', order: 14 },
      { title: 'News Lovers', url: 'https://whatsapp.com/channel/0029Vav6NJ72phHQtxGIIw0n', category: 'Interest Groups', flagEmoji: '📰', order: 15 },
      { title: 'MKM HYPE', url: 'https://t.me/MKMEnterprise', category: 'Telegram Channels', flagEmoji: '📱', order: 16 },
    ];
    await db.insert(channels).values(channelsData);

    // Seed Referrals
    console.log('Seeding referrals...');
    const referralsData = [
      { title: 'Fiverr Gig', url: 'https://fiverr.com', benefit: 'Get premium services', isActive: true, order: 1 },
      { title: 'Upwork Profile', url: 'https://upwork.com', benefit: 'Hire expert developers', isActive: true, order: 2 },
      { title: 'AWS Credits', url: 'https://aws.amazon.com', benefit: 'Get $100 AWS credits', isActive: true, order: 3 },
      { title: 'Digital Ocean', url: 'https://digitalocean.com', benefit: '$100 hosting credit', isActive: true, order: 4 },
      { title: 'GitHub Pro', url: 'https://github.com', benefit: 'Free GitHub Pro access', isActive: true, order: 5 },
    ];
    await db.insert(referrals).values(referralsData);

    // Seed Social Links
    console.log('Seeding social links...');
    const socialLinksData = [
      { platform: 'GitHub', url: 'https://github.com/majidkhanmohmand', icon: '🐙', iconType: 'github', isVisible: true, order: 1 },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/majidkhanmohmand', icon: '💼', iconType: 'linkedin', isVisible: true, order: 2 },
      { platform: 'Twitter', url: 'https://twitter.com/majidkhanmohmand', icon: '𝕏', iconType: 'twitter', isVisible: true, order: 3 },
      { platform: 'Instagram', url: 'https://instagram.com/majidkhanmohmand', icon: '📸', iconType: 'instagram', isVisible: true, order: 4 },
      { platform: 'Facebook', url: 'https://facebook.com/majidkhanmohmand', icon: '👍', iconType: 'facebook', isVisible: true, order: 5 },
      { platform: 'YouTube', url: 'https://youtube.com/@majidkhanmohmand', icon: '▶️', iconType: 'youtube', isVisible: true, order: 6 },
      { platform: 'Email', url: 'mailto:majid@example.com', icon: '✉️', iconType: 'mail', isVisible: true, order: 7 },
    ];
    await db.insert(socialLinks).values(socialLinksData);

    // Seed Hire Options
    console.log('Seeding hire options...');
    const hireOptionsData = [
      {
        title: 'WhatsApp',
        url: 'https://wa.me/1234567890',
        icon: '💬',
        iconType: 'whatsapp',
        description: 'Quick contact via WhatsApp',
        isActive: true,
        order: 1,
      },
      {
        title: 'Fiverr',
        url: 'https://fiverr.com/majidkhanmohmand',
        icon: '🎯',
        iconType: 'fiverr',
        description: 'Hire on Fiverr',
        isActive: true,
        order: 2,
      },
      {
        title: 'Upwork',
        url: 'https://upwork.com/majidkhanmohmand',
        icon: '💼',
        iconType: 'upwork',
        description: 'Hire on Upwork',
        isActive: true,
        order: 3,
      },
    ];
    await db.insert(hireOptions).values(hireOptionsData);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
