import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Confidentiality = () => {
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

        <h1 className="text-4xl font-bold mb-8">Соглашение о конфиденциальности</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <p>
            Настоящим я подтверждаю, что ознакомлен(а) и согласен(на) с условиями обеспечения конфиденциальности 
            информации при обращении к адвокату Мушовцу Алексею Геннадьевичу.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Адвокатская тайна</h2>
          <p>
            В соответствии со статьей 8 Федерального закона «Об адвокатской деятельности и адвокатуре в Российской Федерации» 
            адвокатской тайной являются любые сведения, связанные с оказанием адвокатом юридической помощи своему доверителю.
          </p>
          <p>
            Адвокат не может быть вызван и допрошен в качестве свидетеля об обстоятельствах, ставших ему известными 
            в связи с обращением к нему за юридической помощью или в связи с ее оказанием.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Защита конфиденциальности</h2>
          <p>
            Адвокат обязуется:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Сохранять в тайне все сведения, полученные от доверителя</li>
            <li>Не разглашать информацию третьим лицам без письменного согласия доверителя</li>
            <li>Использовать полученную информацию исключительно в интересах доверителя</li>
            <li>Обеспечить сохранность всех документов и материалов дела</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Исключения</h2>
          <p>
            Адвокат вправе раскрыть конфиденциальную информацию только в следующих случаях:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>С письменного согласия доверителя</li>
            <li>По требованию суда на основании судебного решения</li>
            <li>В случаях, прямо предусмотренных федеральным законом</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Ответственность</h2>
          <p>
            За разглашение адвокатской тайны адвокат несет ответственность в соответствии с законодательством 
            Российской Федерации.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Хранение информации</h2>
          <p>
            Все документы и материалы, полученные в ходе оказания юридической помощи, хранятся адвокатом 
            в условиях, исключающих доступ к ним третьих лиц.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Электронная переписка</h2>
          <p>
            Вся электронная переписка между адвокатом и доверителем защищена и конфиденциальна. 
            Адвокат использует защищенные каналы связи и шифрование для обеспечения безопасности передачи информации.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Согласие доверителя</h2>
          <p>
            Проставляя отметку в форме обратной связи, я подтверждаю, что:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ознакомлен(а) с условиями обеспечения конфиденциальности</li>
            <li>Понимаю свои права в отношении адвокатской тайны</li>
            <li>Доверяю адвокату свою конфиденциальную информацию</li>
            <li>Согласен(на) на обработку информации в рамках оказания юридической помощи</li>
          </ul>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Адвокат:</strong> Мушовец Алексей Геннадьевич<br />
              <strong>Член Адвокатской палаты города Москвы</strong><br />
              <strong>Email:</strong> advokatmushovets@mail.ru<br />
              <strong>Телефон:</strong> +7 905-976-82-80
            </p>
          </div>

          <div className="mt-8 p-4 bg-accent/10 border-l-4 border-accent rounded">
            <p className="text-sm font-semibold">
              В соответствии с Кодексом профессиональной этики адвоката, адвокат обязан соблюдать адвокатскую тайну 
              и обеспечивать конфиденциальность информации на всех этапах взаимодействия с доверителем.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confidentiality;
