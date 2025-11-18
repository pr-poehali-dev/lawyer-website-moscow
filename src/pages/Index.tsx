import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const services = [
    {
      icon: 'Scale',
      title: 'Уголовная защита',
      description: 'Защита по делам о кражах, наркотиках, налоговых преступлениях. Прекращение дел, УДО, изменение меры пресечения.'
    },
    {
      icon: 'Building2',
      title: 'Арбитражные споры',
      description: 'Взыскание долгов, споры по договорам поставки. Представительство в арбитражных судах всех инстанций.'
    },
    {
      icon: 'FileText',
      title: 'Юридическое сопровождение',
      description: 'Комплексное правовое обслуживание бизнеса, консультации по налогообложению и регулированию.'
    },
    {
      icon: 'Users',
      title: 'Гражданские дела',
      description: 'Семейное и трудовое право, споры по интеллектуальной собственности, защита прав потребителей.'
    }
  ];

  const faqs = [
    {
      question: 'Моего брата обвиняют в совершении кражи по ч. 1 ст. 158 УК РФ. Подскажите, можно ли как-нибудь дело прекратить?',
      answer: 'Часть первая статьи 158 УК РФ устанавливает ответственность за преступления небольшой тяжести. Таким образом, освобождение от уголовной ответственности за кражу возможно при наличии ряда условий.\n\nСтатьей 76 УК РФ предусмотрено, что лицо привлекаемое к уголовной ответственности может быть освобождено от привлечения к уголовной ответственности в связи с примирением с пострадавшей стороной, когда вред заглажен потерпевшему. Для этого должны быть одновременно соблюдены несколько условий:\n• виновный совершил преступление впервые;\n• деяние подпадает под небольшую или среднюю тяжесть;\n• вред, нанесенный правонарушителем потерпевшему, должен быть полностью возмещен.\n\nС 15 июля 2016 года суды и следственные органы стали применять новое основание прекращения дела — назначение судебного штрафа. Сам следователь (дознаватель) может возбудить перед судом соответствующее ходатайство. Во всех случаях, каждое уголовное дело индивидуально и требует тщательного изучения адвокатом.'
    },
    {
      question: 'Мой сын был задержан по обвинению в совершении преступления ч.3 ст. 228.1 УК РФ. Можно ли что-нибудь сделать, чтобы его оставили хотя бы под домашним арестом?',
      answer: 'Не всегда тяжесть квалификации преступления является основанием для избрания меры пресечения в виде заключения под стражу. В Вашей ситуации, нужно действовать очень быстро, так как срок времени его задержания ограничен 48 часами, а следователь уже занят подготовкой документов для суда.\n\nНа этом этапе адвокату нужно действовать также оперативно. Необходимо ознакомиться с процессуальными документами составленными следователем с участием Вашего сына, возможно там есть существенные ошибки или иные недостатки, опечатки (затирки). Необходимо собрать материал по личности подозреваемого или обвиняемого (документы подтверждающие фактическое место жительства, образование, документы с места работы, характеристики, документы по состоянию здоровья его и близких родственником, лиц состоящих на иждивении и т.д.).\n\nРезультатом такой подготовки адвоката может являться отказ в удовлетворении ходатайства следователя об избрании в отношении подозреваемого или обвиняемого меры пресечения в виде заключения под стражу и мера пресечения может быть ограничена например домашним арестом или подпиской о невыезде и надлежащем поведении. Примеров в моей практике изменения меры пресечения на не связанную с изоляцией от общества масса. Главное не терять время, а обратиться к профессиональному защитнику.'
    },
    {
      question: 'Мой отец был осужден за грабеж (ч. 2 ст. 161 УК РФ) сроком на 3 года общего режима. Скажите имеет ли он право на УДО и какой порядок?',
      answer: 'Право и успешная реализация условно-досрочного освобождения осужденного зависит от множества факторов и обстоятельств. Преступление грабеж квалифицируемое по части 2 ст. 161 УК РФ относится к категории тяжких преступлений. У Вашего отца право на УДО возникнет по отбытии им наказания не менее половины срока.\n\nВажные условия для положительного решения об УДО увеличивающие шансы, является принятие всех мер по возмещению причинного ущерба потерпевшему. Все чаще суды при рассмотрении ходатайств осужденных на освобождение по УДО вызывают в судебное заседание самих потерпевших и выясняют у них отношение к рассматриваемому ходатайству, принятия мер к возмещению и заглаживанию осужденными причиненного ущерба.\n\nТакже обязательно необходимо заручиться положительными характеристиками от администрации исправительного учреждения. Это также весьма важный момент, поскольку, суд всегда обращает внимание на то, как вел себя осужденный в течение отбытого срока, сколько у него поощрений и наказаний, за какие провинности он привлекался администрацией колонии к мерам дисциплинарного взыскания.\n\nАдвокату на этапе подготовки необходимо сосредоточиться на сборе и анализе таких документов, а при необходимости принять меры к отмене дисциплинарных взысканий у осужденного. Успех в таких мероприятиях зачастую зависит от работы адвоката.'
    },
    {
      question: 'Моему сыну 14 лет. Его избили и отобрали телефон. С чего начать, куда жаловаться?',
      answer: 'Для начала необходимо незамедлительно обратиться в полицию и написать соответствующее заявление. В заявлении подробно изложить обстоятельства хищения, нанесения травм. В этом случае медицинская экспертиза будет проведена по направлению сотрудников полиции в рамках доследственной проверки. Экспертиза установит степень и характер травм, зафиксирует наличие такого факта.\n\nДалее следователь (дознаватель) будет решать вопрос исходя из обстоятельств дела и степени полученных травм о возбуждении уголовного дела. Как правило описываемые Вами события можно квалифицировать по ст. 161 УК РФ (грабеж) или 162 УК РФ (разбой). За это преступление предусмотрены достаточно суровые реальные наказания, связанные с лишением свободы.\n\nВернуть свое имущество или денежную компенсацию за него, а также компенсацию морального вреда причиненного преступлением, Вы сможете путем заявления гражданского иска к лицам совершившим преступление в отношении Вас. Рекомендую доверить представление Ваших интересов по этому делу адвокату.'
    },
    {
      question: 'Мой сын задержан с наркотическим веществом (гашиш) для личного потребления по ч.1 ст. 228 УК РФ. Можно ли прекратить уголовное дело?',
      answer: 'Статью 228 УК РФ часто называют "народная" статья и как правило является следствием стечения обстоятельств. Часть 1 ст. 228 УК РФ относится к категории преступлений средней тяжести, наказание за которое не превышает пяти лет лишения свободы. Размер наказания варьируется от штрафа до реального лишения свободы сроком на три года.\n\nСогласно ст. 76.2. УК РФ Лицо, впервые совершившее преступление небольшой или средней тяжести, может быть освобождено судом от уголовной ответственности с назначением судебного штрафа в случае, если оно возместило ущерб или иным образом загладило причиненный преступлением вред.\n\nВ Вашем случае, необходимо предпринять действия направленные к благоприятным факторам удовлетворения ходатайства о прекращении уголовного дела. Собрать справки об учебе, полученном образовании, положительные характеристики, с работы и учебы, а также по месту жительства, если есть награды, медали, дипломы предоставить следственным органам или в суд. Отсутствие судимости у Вашего сына является благоприятным фактором.\n\nДанное уголовное преступление направлено против здоровья населения и общественной нравственности. Связи с чем, конкретное потерпевшее лицо по таким статьям отсутствует и в данном случае потерпевшей стороной выступает в таких отношениях государство и общество. В целях возмещения ущерба и заглаживания вреда можно оказать благотворительную помощь в фонды помощи детям, детские дома например.\n\nПосле направления уголовного дела в суд необходимо заявить ходатайство о прекращении дела с применением меры уголовно-правового характера в виде судебного штрафа. Для успешной реализации вышеуказанных мероприятий вашему сыну потребуется адвокат.'
    },
    {
      question: 'Вы занимаетесь уголовными делами связанными с неуплатой налогов, обвиняют ч.2 ст. 199 УК РФ?',
      answer: 'Да, занимаюсь, есть положительная практика прекращения таких уголовных дел.'
    },
    {
      question: 'Необходимо обратиться с исковым заявлением в арбитражный суд. Есть должник юридическое лицо. Есть ли у Вас такой опыт?',
      answer: 'Участие в арбитражных процессах, один из основных направлений моей деятельности. Мной проведено множество успешных арбитражных процессов, в суде взысканы денежные средства в пользу доверителей на сотни миллионов рублей.'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-accent/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Scale" className="text-accent" size={32} />
              <div>
                <h1 className="text-xl font-bold text-white">Адвокатский кабинет</h1>
                <p className="text-xs text-accent">Мушовец Алексей Геннадьевич</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-accent transition-colors">О практике</button>
              <button onClick={() => scrollToSection('services')} className="text-white hover:text-accent transition-colors">Услуги</button>
              <button onClick={() => scrollToSection('faq')} className="text-white hover:text-accent transition-colors">Вопросы</button>
              <button onClick={() => scrollToSection('contacts')} className="text-white hover:text-accent transition-colors">Контакты</button>
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 bg-gradient-to-b from-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-accent/20 text-accent text-sm font-semibold tracking-wider mb-4">
                  БОЛЕЕ 20 ЛЕТ ПРАКТИКИ
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Профессиональная<br />защита ваших прав
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Член Адвокатской палаты города Москвы. Специализация по уголовным и арбитражным делам в судах всех уровней.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg"
                  onClick={() => scrollToSection('contacts')}
                >
                  Получить консультацию
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-accent text-accent hover:bg-accent hover:text-primary font-semibold"
                  onClick={() => scrollToSection('faq')}
                >
                  Ответы на вопросы
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
              <img 
                src="https://cdn.poehali.dev/files/13e036c6-7ada-40a1-ba10-6e4660a658c7.png" 
                alt="Адвокат Мушовец Алексей Геннадьевич"
                className="relative z-10 w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">О практике</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                Юридическая практика более 20 лет гражданских, арбитражных и уголовных дел в судах всех уровней.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Успешная адвокатская практика специализации по уголовным делам, позволила защитить нарушенные права доверителей как на стадии предварительного расследования, так и в суде. Результатами успешного ведения уголовных дел являются прекращение уголовных преследований в отношении доверителей или благоприятная переквалификация преступлений, а также существенное снижение наказания.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Успешная многолетняя практика в области ведения гражданских и арбитражных дел позволила сохранить и приумножить имущество доверителей физических и юридических лиц, а также реально взыскать задолженности на сотни миллионов рублей.
              </p>
              <blockquote className="border-l-4 border-accent pl-6 italic text-xl text-foreground">
                "Мы найдем самый оптимальный путь разрешения любых, даже самых сложных и запутанных жизненных ситуаций."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Направления практики</h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Профессиональная защита в Москве, Московской области и по всем регионам России
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-accent transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={service.icon} className="text-accent" size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Вопросы и ответы</h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Ответы адвоката на типовые вопросы клиентов
          </p>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white border-2 border-border rounded-lg px-6 data-[state=open]:border-accent"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-start gap-4 pr-4">
                      <span className="text-accent font-bold text-xl flex-shrink-0">Q{index + 1}</span>
                      <span className="font-semibold text-lg">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-6">
                    <div className="flex items-start gap-4">
                      <span className="text-primary font-bold text-xl flex-shrink-0">A</span>
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-gradient-to-b from-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Контакты</h2>
            <p className="text-xl text-gray-300 mb-12">
              Свяжитесь со мной для получения профессиональной юридической помощи
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-accent/20">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Phone" className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Телефон</h3>
                  <a href="tel:+79059768280" className="text-accent text-xl hover:text-accent/80 transition-colors">
                    +7 905-976-82-80
                  </a>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-accent/20">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Mail" className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <a href="mailto:advokatmushovets@mail.ru" className="text-accent text-xl hover:text-accent/80 transition-colors break-all">
                    advokatmushovets@mail.ru
                  </a>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12">
              <Card className="bg-white/10 backdrop-blur-sm border-accent/20">
                <CardContent className="p-8">
                  <Icon name="MapPin" className="text-accent mx-auto mb-4" size={32} />
                  <h3 className="text-xl font-bold text-white mb-2">Адвокат в Москве</h3>
                  <p className="text-gray-300">Член Адвокатской палаты города Москвы</p>
                  <p className="text-white font-semibold mt-4">Мушовец Алексей Геннадьевич</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary border-t border-accent/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Адвокатский кабинет Мушовца А.Г. Все права защищены.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Профессиональное кредо: «Адвокат — нанятая совесть». Ф.М. Достоевский
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
