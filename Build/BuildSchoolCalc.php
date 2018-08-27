<?php


class BuildSchoolCalc
{

  const JQUERY_FROM_GOOGLE = 0;

  private $srcPath = __DIR__.'/../src';
  private $templatePath = __DIR__.'/../Templates';

  private $deployNames = [
    ['name'=>'Add1_1', 'js'=>'Add1_1', 'up'=>20, 'down'=>200, 'down_sec'=>180],
    ['name'=>'Add2_1', 'js'=>'Add2_1', 'up'=>20, 'down'=>200, 'down_sec'=>180],
    ['name'=>'Add2_2', 'js'=>'Add2_2', 'up'=>20, 'down'=>100, 'down_sec'=>180],
    ['name'=>'Sub1_1', 'js'=>'Sub1_1', 'up'=>20, 'down'=>200, 'down_sec'=>180],
    ['name'=>'Sub2_1', 'js'=>'Sub2_1', 'up'=>20, 'down'=>100, 'down_sec'=>180],
    ['name'=>'Sub2_2', 'js'=>'Sub2_2', 'up'=>20, 'down'=>100, 'down_sec'=>180],
    ['name'=>'Sub2_max19_1', 'js'=>'Sub2_max19_1', 'up'=>100, 'down'=>100, 'down_sec'=>180],
    ['name'=>'Mul1_1', 'js'=>'Mul1_1', 'up'=>20, 'down'=>200, 'down_sec'=>180],
    ['name'=>'Mul1_1_all', 'js'=>'Mul1_1_all', 'up'=>20, 'down'=>200, 'down_sec'=>180],
    ['name'=>'Mul2_1', 'js'=>'Mul2_1', 'up'=>20, 'down'=>100, 'down_sec'=>180],
    ['name'=>'Div2_1', 'js'=>'Div2_1', 'up'=>20, 'down'=>100, 'down_sec'=>180],
    ['name'=>'Div3_1', 'js'=>'Div3_1', 'up'=>20, 'down'=>100, 'down_sec'=>180],
  ];

  public function __construct()
  {
  }

  private function _getReplaces($isCountDown, $standAlone, $settings)
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

    $rets['\'{{$getFormula}}\''] = file_get_contents(__DIR__.sprintf('/../src/FormulaBuilders/%s.js', $settings['js']));
    $rets['\'{{$questionCnt}}\''] = $isCountDown ? $settings['down'] : $settings['up'];
    $rets['\'{{$title}}\''] = sprintf('%s__%s',
      ($isCountDown ? sprintf('cd%s', $settings['down_sec']) : sprintf('cu%s', $settings['up'])),
      $settings['name']);
    if ($isCountDown) {
      $rets['\'{{$limitSec}}\''] = $settings['down_sec'];
    }
    return $rets;
  }



  public function deployCountUp($dstPath, $standAlone=false)
  {
    $template = file_get_contents(__DIR__.'/../Templates/CountUp.html');
    foreach ($this->deployNames as $setting) {
      $replaces = $this->_getReplaces(false, $standAlone, $setting);
      $saveData = str_replace(array_keys($replaces), array_values($replaces), $template);
      $path = sprintf('%s/CountUp_%s.html', $dstPath, $setting['name']);
      file_put_contents($path, $saveData);
    }
  }

  public function deployCountDown($dstPath, $standAlone=false)
  {
    $template = file_get_contents(__DIR__.'/../Templates/CountDown.html');
    foreach ($this->deployNames as $setting) {
      $replaces = $this->_getReplaces(true, $standAlone, $setting);
      $saveData = str_replace(array_keys($replaces), array_values($replaces), $template);
      $path = sprintf('%s/CountDown_%s.html', $dstPath, $setting['name']);
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
