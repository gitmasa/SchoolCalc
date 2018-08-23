<?php


class BuildSchoolCalc
{

  const JQUERY_FROM_GOOGLE = 0;
  const COUNTUP_COUNT = 20;
  const COUNTDOWN_TIMER_SEC = 90;
  const COUNTDOWN_COUNT = 100;

  private $srcPath = __DIR__.'/../src';
  private $templatePath = __DIR__.'/../Templates';

  private $deployNames = [
    'Add1_1',
    'Add2_1',
    'Add2_2',
    'Sub1_1',
    'Sub2_1',
    'Sub2_2',
    'Mul1_1',
    'Mul2_1',
    'Div2_1',
    'Div3_1',
  ];

  public function __construct()
  {
  }

  private function _getReplaces($isCountDown, $name, $standAlone)
  {
    $rets = [];
    $rets['\'{{$jquery}}\''] = (!$standAlone || self::JQUERY_FROM_GOOGLE)
      ? '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>'
      : '<script type="text/javascript">'."\n".file_get_contents(__DIR__.'/../src/jquery-3.3.1.min.js')."\n".'</script>'."\n";

    $rets['\'{{$script}}\''] = !$standAlone
      ? '<script src="./calcSrc.js"></script>'
      : '<script type="text/javascript">'."\n".file_get_contents(__DIR__.'/../src/calcSrc.js')."\n".'</script>'."\n";
    $rets['\'{{$style}}\''] = !$standAlone
      ? '<link rel="stylesheet" href="./calc.css" type="text/css" media="all"/>'
      : '<style type="text/css">'."\n".file_get_contents(__DIR__.'/../src/calc.css')."\n".'</style>'."\n";

    $rets['\'{{$getFormula}}\''] = file_get_contents(__DIR__.sprintf('/../src/FormulaBuilders/%s.js', $name));
    $rets['\'{{$questionCnt}}\''] = $isCountDown ? self::COUNTDOWN_COUNT : self::COUNTUP_COUNT;
    $rets['\'{{$title}}\''] = sprintf('%s__%s',
      ($isCountDown ? sprintf('cd%s', self::COUNTDOWN_TIMER_SEC) : sprintf('cu%s', self::COUNTUP_COUNT)),
      $name);
    if ($isCountDown) {
      $rets['\'{{$limitSec}}\''] = self::COUNTDOWN_TIMER_SEC;
    }
    return $rets;
  }



  public function deployCountUp($dstPath, $standAlone=false)
  {
    $template = file_get_contents(__DIR__.'/../Templates/CountUp.html');
    foreach ($this->deployNames as $name) {
      $replaces = $this->_getReplaces(false, $name, $standAlone);
      $saveData = str_replace(array_keys($replaces), array_values($replaces), $template);
      $path = sprintf('%s/CountUp_%s.html', $dstPath, $name);
      file_put_contents($path, $saveData);
    }
  }

  public function deployCountDown($dstPath, $standAlone=false)
  {
    $template = file_get_contents(__DIR__.'/../Templates/CountDown.html');
    foreach ($this->deployNames as $name) {
      $replaces = $this->_getReplaces(true, $name, $standAlone);
      $saveData = str_replace(array_keys($replaces), array_values($replaces), $template);
      $path = sprintf('%s/CountDown_%s.html', $dstPath, $name);
      file_put_contents($path, $saveData);
    }
  }
  
  public function deployStandAlone($dstPath)
  {
    $this->deployCountUp($dstPath, true);
    $this->deployCountDown($dstPath, true);
  }

  public function deploy($dstPath)
  {
    $this->deployCountUp($dstPath, false);
    $this->deployCountDown($dstPath, false);
    file_put_contents($dstPath.'/calc.css', file_get_contents(__DIR__.'/../src/calc.css'));
    file_put_contents($dstPath.'/calcSrc.js', file_get_contents(__DIR__.'/../src/calcSrc.js'));
  }

}

$builder = new BuildSchoolCalc();
$dstPath = __DIR__.'/../Htmls';
$builder->deploy($dstPath);
$dstPath = __DIR__.'/../HtmlsStandAlone';
$builder->deployStandAlone($dstPath);
