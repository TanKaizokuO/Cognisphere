import { Rocket, Shield, Wrench, BarChart3, Cloud, Users } from 'lucide-react';
import './Features.css';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: Cloud, // Represents Focus Zone (calm, airy)
      title: "Focus Zone",
      description: "Find your center with guided meditations and ambient soundscapes designed to improve concentration and reduce stress.",
    },
    {
      id: 2,
      icon: Users, // Represents Colab Zone (community)
      title: "Colab Zone",
      description: "Connect with fellow learners, join study groups, and collaborate on projects in our vibrant community spaces.",
    },
    {
      id: 3,
      icon: Rocket, // Represents Study Zone (progress/learning)
      title: "Study Zone",
      description: "Access a vast library of courses and interactive learning materials tailored to your personal growth journey.",
    },
    {
      id: 4,
      icon: Wrench, // Represents CogniChat (tool/assistant)
      title: "CogniChat",
      description: "Get instant answers and personalized learning assistance from our advanced AI-powered companion.",
    },
    {
      id: 5,
      icon: Shield, // Represents Serenity Zone (wellness/protection)
      title: "Serenity Zone",
      description: "Track your mental wellness and receive personalized insights to maintain a healthy work-life balance.",
    },
    {
      id: 6,
      icon: BarChart3, // Represents Destress Zone (monitoring/charts)
      title: "Destress Zone",
      description: "Monitor your stress levels in real-time and access immediate tools to help you regain your calm.",
    },
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2>Our Powerful Features</h2>
          <p>Discover why thousands of developers and businesses choose our platform</p>
        </div>

        <div className="features-grid">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div className="feature-card" key={feature.id}>
                <div className="feature-icon">
                  <IconComponent size={24} strokeWidth={1.5} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;