import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          Вернуться на главную
        </Button>

        <h1 className="text-4xl font-bold mb-8">Согласие на обработку персональных данных</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <p>
            Настоящим я, в соответствии с требованиями Федерального закона от 27.07.2006 г. № 152-ФЗ «О персональных данных» 
            даю свое согласие Адвокату Мушовцу Алексею Геннадьевичу (далее – Оператор) на обработку моих персональных данных.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Перечень персональных данных</h2>
          <p>
            Согласие дается на обработку следующих персональных данных:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Фамилия, имя, отчество</li>
            <li>Контактный телефон</li>
            <li>Адрес электронной почты</li>
            <li>Иные данные, указанные в форме обратной связи</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Цели обработки персональных данных</h2>
          <p>
            Персональные данные обрабатываются в следующих целях:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Предоставление юридической консультации</li>
            <li>Связь с целью уточнения деталей обращения</li>
            <li>Заключение договора на оказание юридических услуг</li>
            <li>Информирование о статусе обращения</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Способы обработки персональных данных</h2>
          <p>
            Обработка персональных данных осуществляется следующими способами:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Сбор, запись, систематизация, накопление, хранение</li>
            <li>Уточнение (обновление, изменение)</li>
            <li>Извлечение, использование, передача (распространение, предоставление, доступ)</li>
            <li>Блокирование, удаление, уничтожение</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Срок действия согласия</h2>
          <p>
            Согласие действует с момента его предоставления до момента его отзыва субъектом персональных данных.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Право на отзыв согласия</h2>
          <p>
            Я уведомлен(а) о том, что согласие на обработку персональных данных может быть отозвано мной путем направления 
            письменного заявления Оператору по адресу электронной почты: advokatmushovets@mail.ru
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Безопасность персональных данных</h2>
          <p>
            Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных 
            от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, 
            предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении 
            персональных данных.
          </p>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Адвокат:</strong> Мушовец Алексей Геннадьевич<br />
              <strong>Email:</strong> advokatmushovets@mail.ru<br />
              <strong>Телефон:</strong> +7 905-976-82-80
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
