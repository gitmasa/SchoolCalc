<?php


class BuildSchoolCalc
{

  const JQUERY_FROM_GOOGLE = 0;
  const COUNTUP_COUNT = 20;
  const COUNTDOWN_LIMIT = 180;

  private $srcPath = __DIR__.'/../src';
  private $templatePath = __DIR__.'/../Templates';

  private $deployNames = [
		['name'=>'Add_A', 'js'=>'Add_A', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
//		['name'=>'Add_A2', 'js'=>'Add_A2', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'Add_B', 'js'=>'Add_B', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'Sub_A', 'js'=>'Sub_A', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
//		['name'=>'Sub_A2', 'js'=>'Sub_A2', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'Sub_B', 'js'=>'Sub_B', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Add1_1', 'js'=>'Add1_1', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Add2_1', 'js'=>'Add2_1', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Add2_2', 'js'=>'Add2_2', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'Add3_3', 'js'=>'Add3_3', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Sub1_1', 'js'=>'Sub1_1', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Sub2_1', 'js'=>'Sub2_1', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Sub2_2', 'js'=>'Sub2_2', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'Sub3_2', 'js'=>'Sub3_2', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Sub2_max19_1', 'js'=>'Sub2_max19_1', 'up'=>100, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'AddSub_Float_1', 'js'=>'AddSub_Float_1', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'AddSub_Float_12', 'js'=>'AddSub_Float_12', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Mul1_1', 'js'=>'Mul1_1', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Mul1_1_all', 'js'=>'Mul1_1_all', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Mul2_1_1', 'js'=>'Mul2_1_1', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Mul2_1', 'js'=>'Mul2_1', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'Mul3_1', 'js'=>'Mul3_1', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'Mul2_2', 'js'=>'Mul2_2', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Div2_1', 'js'=>'Div2_1', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'Div2_1_Easy', 'js'=>'Div2_1_Easy', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'DivA2_1', 'js'=>'DivA2_1', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Div3_1', 'js'=>'Div3_1', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'DivA3_1', 'js'=>'DivA3_1', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'Div3_2_Lv1', 'js'=>'Div3_2_Lv1', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'Div3_2_Lv2', 'js'=>'Div3_2_Lv2', 'up'=>self::COUNTUP_COUNT, 'down'=>100, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'Pi_1', 'js'=>'Pi_1', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'FractSimple', 'js'=>'FractSimple', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'ToFractSimple', 'js'=>'ToFractSimple', 'up'=>self::COUNTUP_COUNT, 'down'=>200, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'StoryAddSub', 'js'=>'StoryAddSub', 'up'=>self::COUNTUP_COUNT, 'down'=>50, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'StorySet', 'js'=>'StorySet', 'up'=>self::COUNTUP_COUNT, 'down'=>50, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'StorySetLv2', 'js'=>'StorySetLv2', 'up'=>self::COUNTUP_COUNT, 'down'=>50, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'lcm', 'js'=>'lcm2_2', 'up'=>10, 'down'=>30, 'down_sec'=>self::COUNTDOWN_LIMIT],
    ['name'=>'gcd', 'js'=>'gcd', 'up'=>10, 'down'=>30, 'down_sec'=>self::COUNTDOWN_LIMIT],
  ];

	private $deploySagashiNames = [
		['name'=>'sagashi', 'dstName'=>'Sagashizan.html', 'template'=>__DIR__.'/../Templates/Sagashizan.html', 'js'=>'', 'up'=>10, 'down'=>30, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'sagashi', 'dstName'=>'Sagashizan33.html', 'template'=>__DIR__.'/../Templates/Sagashizan33.html', 'js'=>'', 'up'=>10, 'down'=>30, 'down_sec'=>self::COUNTDOWN_LIMIT],
		['name'=>'sagashi', 'dstName'=>'Sagashizan43.html', 'template'=>__DIR__.'/../Templates/Sagashizan43.html', 'js'=>'', 'up'=>10, 'down'=>30, 'down_sec'=>self::COUNTDOWN_LIMIT],
	];

  public function __construct()
  {
  }

  private function _getReplaces($isCountDown, $standAlone, $settings)
  {
    $rets = [];
    $rets['\'{{$jquery}}\''] = !$standAlone
      ? (self::JQUERY_FROM_GOOGLE
        ? '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>'
        : '<script src="./jquery.min.js"></script>')
      : '<script type="text/javascript">'."\n".file_get_contents(__DIR__.'/../src/jquery-3.3.1.min.js')."\n".'</script>'."\n";
    $rets['\'{{$script}}\''] = !$standAlone
      ? '<script src="./calcSrc.js"></script>'
      : '<script type="text/javascript">'."\n".file_get_contents(__DIR__.'/../src/calcSrc.js')."\n".'</script>'."\n";
		$rets['\'{{$script_sagashi}}\''] = !$standAlone
			? '<script src="./sagashizan.js"></script>'
			: '<script type="text/javascript">'."\n".file_get_contents(__DIR__.'/../src/sagashizan.js')."\n".'</script>'."\n";
    $rets['\'{{$style}}\''] = !$standAlone
      ? '<link rel="stylesheet" href="./calc.css" type="text/css" media="all"/>'
      : '<style type="text/css">'."\n".file_get_contents(__DIR__.'/../src/calc.css')."\n".'</style>'."\n";

    if (strlen($settings['js'])) {
			$rets['\'{{$getFormula}}\''] = file_get_contents(__DIR__.sprintf('/../src/FormulaBuilders/%s.js', $settings['js']));
		}

    $rets['\'{{$questionCnt}}\''] = $isCountDown ? $settings['down'] : $settings['up'];
    $rets['\'{{$title}}\''] = sprintf('%s__%s',
      ($isCountDown ? sprintf('cd%s', $settings['down_sec']) : sprintf('cu%s', $settings['up'])),
      $settings['name']);
    if ($isCountDown) {
      $rets['\'{{$limitSec}}\''] = $settings['down_sec'];
    }
    return $rets;
  }



  public function deployCountUp($targets, $template, $dstPath, $standAlone=false)
  {
    $template = file_get_contents($template);
    foreach ($targets as $setting) {
      $replaces = $this->_getReplaces(false, $standAlone, $setting);
      $saveData = str_replace(array_keys($replaces), array_values($replaces), $template);
      $path = sprintf('%s/CountUp_%s.html', $dstPath, $setting['name']);
      file_put_contents($path, $saveData);
    }
  }

  public function deployCountDown($targets, $template, $dstPath, $standAlone=false)
  {
    $template = file_get_contents($template);
    foreach ($targets as $setting) {
      $replaces = $this->_getReplaces(true, $standAlone, $setting);
      $saveData = str_replace(array_keys($replaces), array_values($replaces), $template);
      $path = sprintf('%s/CountDown_%s.html', $dstPath, $setting['name']);
      file_put_contents($path, $saveData);
    }
  }

	public function deploySagashi($targets, $dstPath, $standAlone=false)
	{
		foreach ($targets as $setting) {
			$template = file_get_contents($setting['template']);
			$replaces = $this->_getReplaces(false, $standAlone, $setting);
			$saveData = str_replace(array_keys($replaces), array_values($replaces), $template);
			$path = sprintf('%s/%s', $dstPath, $setting['dstName']);
			file_put_contents($path, $saveData);
		}
	}

	public function deployStandAlone($dstPath)
  {
    $this->deployCountUp($this->deployNames, __DIR__.'/../Templates/CountUp.html', $dstPath, true);
    $this->deployCountDown($this->deployNames, __DIR__.'/../Templates/CountDown.html', $dstPath, true);
    $this->deploySagashi($this->deploySagashiNames, $dstPath, true);
  }

  public function deploy($dstPath)
  {
    $this->deployCountUp($this->deployNames, __DIR__.'/../Templates/CountUp.html', $dstPath, false);
    $this->deployCountDown($this->deployNames, __DIR__.'/../Templates/CountDown.html', $dstPath, false);
		$this->deploySagashi($this->deploySagashiNames, $dstPath, false);
    file_put_contents($dstPath.'/calc.css', file_get_contents(__DIR__.'/../src/calc.css'));
    file_put_contents($dstPath.'/calcSrc.js', file_get_contents(__DIR__.'/../src/calcSrc.js'));
		file_put_contents($dstPath.'/sagashizan.js', file_get_contents(__DIR__.'/../src/sagashizan.js'));
    if (!self::JQUERY_FROM_GOOGLE) {
      file_put_contents($dstPath.'/jquery.min.js', file_get_contents(__DIR__.'/../src/jquery-3.3.1.min.js'));
    }
  }

}

$builder = new BuildSchoolCalc();
$dstPath = __DIR__.'/../Htmls';
$builder->deploy($dstPath);
$dstPath = __DIR__.'/../HtmlsStandAlone';
$builder->deployStandAlone($dstPath);
