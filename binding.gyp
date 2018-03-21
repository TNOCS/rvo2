{
  'variables': {
    'module_name%': 'rvo2'
  },

  'targets': [
    {
      'target_name': '<(module_name)',
      'defines': [ 'V8_DEPRECATION_WARNINGS=1' ],
      'cflags': [ '-Wall -O3' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'sources': [ 'rvo2_wrap.cxx', 'src/Agent.cpp', 'src/KdTree.cpp', 'src/Obstacle.cpp', 'src/RVOSimulator.cpp' ],
      'conditions': [
        ['OS=="linux"', {
          'cflags': [
            '-fopenmp'
          ],
          'libraries': [
            '-lgomp'
          ]
        }],
        ['OS=="mac"', {
          "xcode_settings": {
            "CLANG_CXX_LANGUAGE_STANDARD": "c++11",
            "CLANG_CXX_LIBRARY": "libc++",
            "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
            "GCC_ENABLE_CPP_RTTI": "YES",
            "MACOSX_DEPLOYMENT_TARGET": "10.9"
          }
        }]
      ],
      'configurations': {
        'Release': {
          'msvs_settings': {
            'VCCLCompilerTool': {
              'ExceptionHandling': 1,
              'AdditionalOptions': [
                '/openmp', # compile across multiple CPUs
              ],
            }
          }
        }
      }
    }]
}
