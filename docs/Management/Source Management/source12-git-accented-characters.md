---
  id: git-accented-characters
  title: GIT Accented Characters
---
#  GIT: Accented Characters in Filenames

If you are using file names with non-ASCII characters in them, then Git will sometimes behave funny.  There are some commands to know about.

## Example

We have some folders with the following names:

```
\Rules\Québec TaxRate.2\Taux du Canada.dt
\Rules\Québec TaxRate.2\Taux du Québec.dt
```


The e with an ague accent is non-ASCII and so it will be treated specially.  When you add these files to the archive using the Git command line, you can then do a status and see the following:

```
 new file: "Rules/Qu\303\251bec TaxRate.2/Taux du Canada.dt"
 new file: "Rules/Qu\303\251bec TaxRate.2/Taux du Qu\303\251bec.dt"
```


This is called ‘quoting the paths’ and the values are in octal.  The “\\303\\251” is the UTF-8 encoding of the characters displayed in octal.

## Turning Path Quoting OFF

You can turn off this feature using the following command:

```
git config --global core.quotePath false
```


After this, the git status command will look like this:

```
new file: Rules/Québec TaxRate.2/Taux du Canada.dt
new file: Rules/Québec TaxRate.2/Taux du Québec.dt
```


Much nicer.  It does include this warning:  

_Warning: Your console font probably doesn’t support Unicode. If you experience strange characters in the output, consider switching to a TrueType font such as Consolas!_  

I followed this with a commit, and everything was committed correctly to the repository.  It seems this would be the case whether you have this setting on or off.  The setting seems to just effect the way that paths are displayed on the screen when running commands.