import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <Card className="max-w-4xl mx-auto bg-white border-2 border-accent/30 shadow-2xl">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <Icon name="Cookie" className="text-accent flex-shrink-0 mt-1" size={32} />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Мы используем файлы Cookie</h3>
              <p className="text-muted-foreground mb-4">
                Этот сайт использует файлы cookie для улучшения работы и анализа трафика. 
                Продолжая использовать сайт, вы соглашаетесь с использованием файлов cookie. 
                Подробнее о политике конфиденциальности можно узнать в разделе "Согласие на обработку персональных данных".
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={acceptCookies}
                  className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                >
                  Принять
                </Button>
                <Button 
                  onClick={declineCookies}
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-primary"
                >
                  Отклонить
                </Button>
              </div>
            </div>
            <button 
              onClick={declineCookies}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Закрыть"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;
